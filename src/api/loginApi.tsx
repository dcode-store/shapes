import axios, { AxiosError } from 'axios';
import { BACKEND_URL } from '../constants/urls';

const loginApi = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


export const loginUrlEndpoint = '/login';

export const login = async (formData: FormData) => {
    try {
        const response = await loginApi.post(loginUrlEndpoint, formData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError
            console.log('login failed:', error?.response);
            return error.response;
        } else {
            console.error('login failed:', error);
        }
    }
}