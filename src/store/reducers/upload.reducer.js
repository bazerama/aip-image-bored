export const UPLOAD_IMAGE_REQUEST = 'upload-image-request';
export const UPLOAD_IMAGE_SUCCESS = 'upload-image-success';
export const UPLOAD_IMAGE_FAILURE = 'upload-image-failure';
export const UPLOAD_REPLY_REQUEST = 'upload-reply-request';
export const UPLOAD_REPLY_SUCCESS = 'upload-reply-success';
export const UPLOAD_REPLY_FAILURE = 'upload-reply-failure';

const initialStateImage = {
    success: false,
    isUploading: false,
    uploadErrorMessage: '',
};

const initialStateReply = {
    success: false,
    isUploading: false,
    uploadErrorMessage: '',
    reply: null,
};

/**
 * This reducer pattern I got from another project I worked on
 * https://redux.js.org/basics/reducers#splitting-reducers
 * This reducer uploads images and replies
 */

export function uploadImage(state = initialStateImage, action) {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return {
                isUploading: true,
            };
        case UPLOAD_IMAGE_SUCCESS:
            return {
                success: true,
                isUploading: false,
            };
        case UPLOAD_IMAGE_FAILURE:
            return {
                success: false,
                isUploading: false,
                uploadErrorMessage: action.error,
            };
        default:
            return state;
    }
}

export function uploadReply(state = initialStateReply, action) {
    switch (action.type) {
        case UPLOAD_REPLY_REQUEST:
            return {
                isUploading: true,
            };
        case UPLOAD_REPLY_SUCCESS:
            return {
                success: true,
                isUploading: false,
                reply: action.reply,
            };
        case UPLOAD_REPLY_FAILURE:
            return {
                success: false,
                isUploading: false,
                uploadErrorMessage: action.error,
            };
        default:
            return state;
    }
}
