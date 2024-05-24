import axios from 'axios';
import { BACKEND_URL } from '../constants/urls';

const backendApi = axios.create({
    baseURL: BACKEND_URL,
});

export const allFilesEndpoint = '/list_objects';


export const uploadFile = async (file: any) => {
    const tokens = localStorage.getItem('auth');
    if (tokens) {
        let accessToken = JSON.parse(tokens).access_token;
        backendApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    const formData = new FormData();
    formData.append('file', file);
    return backendApi.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const getAllFiles = async () => {
    const tokens = localStorage.getItem('auth');
    if (tokens) {
        let accessToken = JSON.parse(tokens).access_token;
        backendApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        backendApi.defaults.headers.common['Content-Type'] = 'application/json';

    }
    return backendApi.get(allFilesEndpoint);
}