export const REGISTER_REQUEST = 'register-request';
export const REGISTER_SUCCESS = 'register-success';
export const REGISTER_FAILURE = 'register-failure';
export const HIDE_MESSAGE = 'hide-register-message';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { registerSuccessful: true, user } : {};

/**
 * This reducer pattern I got from another project I worked on
 * https://redux.js.org/basics/reducers#splitting-reducers
 * This reducer registers a new user
 */

function register(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                registering: true,
                user: action.user,
            };
        case REGISTER_SUCCESS:
            return {
                registering: false,
                registerSuccessful: true,
                user: action.user,
            };
        case REGISTER_FAILURE:
            return {
                registering: false,
                registerError: true,
                registerErrorMessage: action.error,
            };
        case HIDE_MESSAGE:
            return {
                registerSuccessful: false,
                registerError: false,
                registerErrorMessage: '',
            };
        default:
            return state;
    }
}

export default register;
