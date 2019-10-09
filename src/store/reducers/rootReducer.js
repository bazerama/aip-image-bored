import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import login from './login.reducer';
import register from './register.reducer';
import { getThreads, getReplies, reaction } from './forumpost.reducer';
import { uploadImage, uploadReply } from './upload.reducer';

export default combineReducers({
    authentication: authentication,
    login: login,
    register: register,
    getThreads: getThreads,
    getReplies: getReplies,
    reaction: reaction,
    uploadImage: uploadImage,
    uploadReply: uploadReply,
});
