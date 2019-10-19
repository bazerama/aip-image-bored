export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';
export const HIDE_MESSAGE = 'hide-login-message';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loginSuccessful: true, user } : {};

/**
 * This reducer pattern I got from another project I worked on
 * https://redux.js.org/basics/reducers#splitting-reducers
 * This reducer logs in an existing user
 */

function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };
        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loginSuccessful: true,
                user: action.user,
            };
        case LOGIN_FAILURE:
            return {
                loggingIn: false,
                loginError: true,
                loginErrorMessage: action.error,
            };
        case HIDE_MESSAGE:
            return {
                loginSuccessful: false,
                loginError: false,
                loginErrorMessage: '',
            };
        default:
            return state;
    }
}

export default login;
