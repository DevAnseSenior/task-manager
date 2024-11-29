import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database;

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks');
    
            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: 'POST',
        path: '/tasks',
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
    }
];