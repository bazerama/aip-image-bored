export const LOGIN_REQUEST = 'login-request';
export const LOGIN_SUCCESS = 'login-success';
export const LOGIN_FAILURE = 'login-failure';
export const LOGIN_FAILURE_MESSAGE = "It appears you've entered an incorrect email or password";
export const HIDE_MESSAGE = 'hide-message';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loginSuccessful: true, user } : {};

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
                loginErrorMessage: LOGIN_FAILURE_MESSAGE,
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
