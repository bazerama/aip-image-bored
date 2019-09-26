import { history } from '../services/history.service';
import authenticate from '../services/authentication.service';
import login from '../services/login.service';

export function authenticateAction() {
    return dispatch => {
        authenticate().then(
            user => {
                dispatch({ type: 'authentication-success', authUser: user });
            },
            error => {
                dispatch({ type: 'authentication-failure', authError: error });
            }
        );
    };
}

export function loginAction(username, password) {
    return dispatch => {
        dispatch({ type: 'login-request', user: { username } });
        login(username, password).then(
            user => {
                dispatch({ type: 'login-success', user: user });
                setTimeout(() => {
                    history.push('/');
                    window.location.reload(true);
                }, 3000);
            },
            error => {
                dispatch({ type: 'login-failure', error: error });
                setTimeout(() => {
                    dispatch({ type: 'hide-message' });
                }, 4000);
            }
        );
    };
}

export function logoutAction() {
    return dispatch => {
        dispatch({ type: 'logout' });
        dispatch({ type: 'hide-message' });
        localStorage.removeItem('user');
    };
}
