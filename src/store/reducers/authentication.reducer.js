export const AUTHENTICATION_SUCESS = 'authentication-success';
export const AUTHENTICATION_FAILURE = 'authentication-failure';
export const LOGOUT = 'logout';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false };

function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION_SUCESS:
            return {
                isLoggedIn: true,
            };
        case AUTHENTICATION_FAILURE:
            return {
                isLoggedIn: false,
                authenticationErrorMessage: action.error,
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
            };
        default:
            return state;
    }
}

export default authentication;
