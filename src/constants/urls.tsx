// for local development
let BACKEND_URL: string = process.env.REACT_APP_BACKEND_URL || 'http://0.0.0.0:8000';
let APPS_BASE_URL: string = process.env.REACT_APP_BASE_URL || 'http://0.0.0.0';

if (process.env.REACT_APP_ENV === 'production') {
    BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://journoo.me/api';
    APPS_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://journoo.me';
}

const webUrl: string = APPS_BASE_URL

export { webUrl, BACKEND_URL, APPS_BASE_URL }
