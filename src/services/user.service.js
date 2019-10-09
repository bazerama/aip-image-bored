/*
 **  The following code utilises the async/await pattern with fetch()
 **  This is influenced by this tutorial:
 **  https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait
 **  John Paul Ada's code has allowed me to asynchronously fetch data from
 **  my API and get the text(), then process the response.
 */

export async function authenticate() {
    const currentUser = localStorage.getItem('user');

    if (currentUser == null) {
        // modify this to become a global const.
        return Promise.reject('user not authenticated');
    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: currentUser }),
    };

    const response = await fetch('http://localhost:5000/api/authenticate', request);
    const user = await handleResponse(response);

    if (!user.success) {
        localStorage.removeItem('user');
        return Promise.reject(user.error);
    }

    // modify this to pass some more meaningful auth data
    // server.js only passes user._id from mongo
    return Promise.resolve(user);
}

export async function login(username, password) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    };

    const response = await fetch('http://localhost:5000/api/login', request);
    const user = await handleResponse(response);

    if (!user.success) {
        return Promise.reject(user.error);
    }

    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve(user);
}

export async function register(username, password, email) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, email: email }),
    };

    const response = await fetch('http://localhost:5000/api/register', request);
    const user = await handleResponse(response);

    if (!user.success) {
        return Promise.reject(user.error);
    }

    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve(user);
}

export async function handleResponse(response) {
    const text = await response.text();
    const data = text && JSON.parse(text);

    if (!response.ok) {
        const error = (data && data.message) || (response.status && response.statusText);
        return Promise.reject(error);
    }

    return data;
}
