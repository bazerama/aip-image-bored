import { handleResponse } from './user.service';

/**
 * This service handle getting threads, replies and sending reactions
 * It will fetch from the API and return the applicable data. It also
 * utilises await and promises to ensure errors do not occut
 */

export async function getThreads() {
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch('http://localhost:5000/api/getThreads', request);
    const threads = await handleResponse(response);

    if (!response.ok) {
        return Promise.reject(threads.error);
    }

    return Promise.resolve(threads);
}

export async function getReplies(replies) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replies: replies }),
    };

    const response = await fetch('http://localhost:5000/api/getReplies', request);
    const threads = await handleResponse(response);

    if (!response.ok) {
        return Promise.reject(threads.error);
    }

    return Promise.resolve(threads);
}

export async function react(reactionId, postId, mode) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionId: reactionId, postId: postId, mode: mode }),
    };

    const response = await fetch('http://localhost:5000/api/react', request);
    const reaction = await handleResponse(response);

    if (!reaction.success) {
        return Promise.reject(reaction.error);
    }

    console.log(reaction);

    return Promise.resolve(reaction);
}
