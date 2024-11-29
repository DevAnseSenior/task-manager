export function validateTask(body) {
    const { title, description } = body;

    if (!title || typeof title !== 'string') {
        return 'The field title is mandatory and must be string.';
    }

    if (!description || typeof description !== 'string') {
        return 'The field description is mandatory and must be string.'
    }
    
    return null;
}