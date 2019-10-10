import { handleResponse } from './user.service';

export async function getThreads() {
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(process.env.REACT_APP_SEARCH_API_ENV + '/api/getThreads', request);
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

    const response = await fetch(process.env.REACT_APP_SEARCH_API_ENV + '/api/getReplies', request);
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

    const response = await fetch(process.env.REACT_APP_SEARCH_API_ENV + '/api/react', request);
    const reaction = await handleResponse(response);

    if (!reaction.success) {
        return Promise.reject(reaction.error);
    }

    console.log(reaction);

    return Promise.resolve(reaction);
}
