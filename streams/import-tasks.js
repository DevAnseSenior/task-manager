import { parse } from "csv-parse";
import fs from 'node:fs';

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2,
});

async function register() {
    const lineParse = stream.pipe(csvParse);

    for await (const line of lineParse) {
        const [title, description] = line;

        await fetch('http://localhost:3334/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title, 
                description,
            })
        });
        await wait(1000);
    }
}

register();