export async function checkCredentials() {
    const user = localStorage.getItem('user');

    // modify this to include error messages for Server Error, Bad credentials etc.
    if (user == null) {
        return Promise.reject('user not authenticated');
    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user }),
    };

    return await fetch('http://localhost:5000/api/authenticate', request).then(user => {
        if (user.error != null) {
            return Promise.reject(user.error);
        } else {
            return Promise.resolve('user authenticated');
        }
    });
}

export async function login(username, password) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    };

    return await fetch('http://localhost:5000/api/login', request)
        .then(handleResponse)
        .then(user => {
            if (!user.success) {
                return Promise.reject(user.error);
            }
            localStorage.setItem('user', JSON.stringify(user));
            return Promise.resolve(user);
        });
}

export async function register(username, password, email) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, email: email }),
    };

    return await fetch('http://localhost:5000/api/register', request)
        .then(handleResponse)
        .then(user => {
            if (user.error != null) {
                return Promise.reject(user.error);
            }
            localStorage.setItem('user', JSON.stringify(user));
            return Promise.resolve(user);
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || (response.status && response.statusText);
            return Promise.reject(error);
        }

        return data;
    });
}
