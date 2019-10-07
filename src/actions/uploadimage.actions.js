import { uploadImage } from '../services/uploadimage.service';

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
                dispatch({ type: 'upload-image-failure', uploadError: error });
            }
        );
    };
}
