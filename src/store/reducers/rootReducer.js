import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import login from './login.reducer';
import register from './register.reducer';

export default combineReducers({ authentication: authentication, login: login, register: register });
