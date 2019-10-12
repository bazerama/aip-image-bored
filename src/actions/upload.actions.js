import { uploadImage, uploadReply } from '../services/upload.service';

/*
 **  Some of the following code utilises the snippet:
 **      return dispatch => { ... }
 **  This is taken from https://github.com/reduxjs/redux-thunk and allows
 **  for action creators to return a function instead of an action.
 **  This also allows for us to call async functions, like checkCredentials()
 */

export function uploadImageAction(file, user) {
    return dispatch => {
        dispatch({ type: 'upload-image-request' });
        uploadImage(file, user).then(
            image => {
                dispatch({ type: 'upload-image-success', image: image });
            },
            error => {
                dispatch({ type: 'upload-image-failure', error: error });
            }
        );
    };
}

export function uploadReplyAction(depth, parentId, file, user) {
    return dispatch => {
        dispatch({ type: 'upload-reply-request' });
        uploadReply(depth, parentId, file, user).then(
            reply => {
                dispatch({ type: 'upload-reply-success', reply: reply });
            },
            error => {
                dispatch({ type: 'upload-reply-failure', error: error });
            }
        );
    };
}
