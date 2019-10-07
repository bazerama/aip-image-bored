import { handleResponse } from './user.service';

export async function react(reactionId, postId) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionId: reactionId, postId: postId }),
    };

    const response = await fetch('http://localhost:5000/api/react', request);
    const reaction = await handleResponse(response);

    if (!reaction.success) {
        return Promise.reject(reaction.error);
    }

    return Promise.resolve(reaction);
}
