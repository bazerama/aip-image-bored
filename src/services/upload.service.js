import { handleResponse } from './user.service';

/**
 * This service handles uploading images and replies
 * Utilises formdata to post the images to the API
 *
 * Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 * https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
 */

export async function uploadImage(file, user) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user);

    const request = {
        method: 'POST',
        body: formData,
    };

    const response = await fetch('http://localhost:5000/api/uploadImage', request);
    const image = await handleResponse(response);

    if (!image.success) {
        return Promise.reject(image.error);
    }

    return Promise.resolve(image);
}

export async function uploadReply(depth, parentId, file, user) {
    const formData = new FormData();
    formData.append('depth', depth);
    formData.append('parentId', parentId);
    formData.append('file', file);
    formData.append('userId', user);

    const request = {
        method: 'POST',
        body: formData,
    };

    const response = await fetch('http://localhost:5000/api/uploadReply', request);
    const reply = await handleResponse(response);

    if (!reply.success) {
        return Promise.reject(reply.error);
    }

    return Promise.resolve(reply);
}
