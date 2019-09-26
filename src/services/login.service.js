import { logoutAction } from '../actions/user.actions';

export default function login(username, password) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
    };

    return fetch('http://localhost:5000/api/login', request)
        .then(handleResponse)
        .then(user => {
            if (null != user.error && user.error === 'no results') {
                return Promise.reject(user.error);
            } else {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                logoutAction();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
