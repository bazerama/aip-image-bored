export default function authenticate() {
    const user = localStorage.getItem('user');

    // modify this to include error messages for Server Error, Bad credentials etc.
    if (null == user) {
        return Promise.reject('user not authenticated');
    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user }),
    };

    return fetch('http://localhost:5000/api/authenticate', request).then(user => {
        if (null != user) {
            return Promise.resolve('user authenticated');
        } else {
            return Promise.reject('user not authenticated');
        }
    });
}
