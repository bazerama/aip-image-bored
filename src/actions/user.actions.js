import { history } from '../services/history.service';
import { authenticate, login, register } from '../services/user.service';

/*
**  Some of the following code utilises the snippet:
**      return dispatch => { ... }
**  This is taken from https://github.com/reduxjs/redux-thunk and allows
**  for action creators to return a function instead of an action.
**  This also allows for us to call async functions, like checkCredentials()
*/

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

export function registerAction(username, password, email) {
    return dispatch => {
        dispatch({ type: 'register-request', user: { username } });
        register(username, password, email).then(
            user => {
                dispatch({ type: 'register-success', user: user });
                setTimeout(() => {
                    history.push('/');
                    window.location.reload(true);
                }, 3000);
            },
            error => {
                dispatch({ type: 'register-failure', error: error });
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
