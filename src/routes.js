import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

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

            if (!title || !description) {
                return res
                    .writeHead(400, {'Content-Type': 'application/json'})
                    .end(JSON.stringify({error: 'The fields title and description are mandatory.'}));
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
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete('tasks', id)

            return res.writeHead(204).end();
        },
    }
];