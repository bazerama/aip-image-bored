import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import login from './login.reducer';
import register from './register.reducer';
import uploadimage from './uploadimage.reducer';

export default combineReducers({
    authentication: authentication,
    login: login,
    register: register,
    uploadimage: uploadimage,
});
