export const UPLOAD_IMAGE_REQUEST = 'upload-image-request';
export const UPLOAD_IMAGE_SUCCESS = 'upload-image-success';
export const UPLOAD_IMAGE_FAILURE = 'upload-image-failure';

const initialState = {
    success: false,
    isUploading: true,
    errorMessage: '',
};

function uploadImage(state = initialState, action) {
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
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
}

export default uploadImage;
