import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import login from './login.reducer';
import register from './register.reducer';
import { getThreads, getReplies, reaction } from './forumpost.reducer';
import { uploadImage, uploadReply } from './upload.reducer';

/**
 * This rootReducer will combine all the other ones, duh
 * Code snippet and inspiration here:
 * https://redux.js.org/recipes/structuring-reducers/using-combinereducers#using-combinereducers
 */

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
