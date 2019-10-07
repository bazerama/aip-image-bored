import { handleResponse } from './user.service';

/*
 **  Nice little snipet for creating image uploads by Fabiano, Medium article + code here:
 **  https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
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
    console.log('image', image);

    if (!response.success) {
        return Promise.reject(response.error);
    }

    return Promise.resolve(response);
}
