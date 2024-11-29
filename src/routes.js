import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { validateTask } from './utils/validate-task.js';

const database = new Database;

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks');
    
            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            const validationError = validateTask({ title, description });

            if (validationError) {
                return res
                    .writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: validationError}));
            }
    
            const task = {
                id: randomUUID(),
                title,
                description,
                completed: false,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: null,
            }
    
            database.insert('tasks', task);
    
            return res.writeHead(201).end();
        },
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
            
            const task = database.find('tasks', id);

            if (!task) {
                return res
                    .writeHead(404, {'Content-Type': 'application/json'})
                    .end(JSON.stringify({ error: 'Task not found'}));
            }
    
            database.update('tasks', id, {
                ...task,
                completed: true,
                completed_at: new Date().toISOString(),
            });

            return res.writeHead(204).end();
        },
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            const validationError = validateTask({ title, description });

            if (validationError) {
                return res
                    .writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: validationError}));
            }

            const task = database.find('tasks', id);

            if (!task) {
                return res
                    .writeHead(404, {'Content-Type': 'application/json'})
                    .end(JSON.stringify({ error: 'Task not found'}));
            }
    
            database.update('tasks', id, {
                ...task,
                title,
                description,
                updated_at: new Date().toISOString(),
            });


            return res.writeHead(204).end();
        },
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            const task = database.find('tasks', id);

            if (!task) {
                return res
                    .writeHead(404, {'Content-Type': 'application/json'})
                    .end(JSON.stringify({ error: 'Task not found'}));
            }

            database.delete('tasks', id)

            return res.writeHead(204).end();
        },
    }
];