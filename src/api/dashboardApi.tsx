import axios from 'axios';
import { BACKEND_URL } from '../constants/urls';

const dashboardApi = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const backendApi = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// endpoints
export const dashboardEndpoint = '/dashboard';
export const dashboardUrl = `${BACKEND_URL}${dashboardEndpoint}`;


export const dashboardDetails = async () => {
    const tokens = localStorage.getItem('auth');
    if (tokens) {
        let accessToken = JSON.parse(tokens).access_token;
        dashboardApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    return dashboardApi.get(dashboardEndpoint);
}

export const postDashboard = async (payload: any) => {
    const tokens = localStorage.getItem('auth');
    if (tokens) {
        let accessToken = JSON.parse(tokens).access_token;
        dashboardApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    return dashboardApi.post(dashboardEndpoint, payload);
}