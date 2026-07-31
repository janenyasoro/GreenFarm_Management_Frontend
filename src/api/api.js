// src/api/api.js
// Axios instance with interceptors for auth token management
import axios from 'axios';

// Prefer an explicit deployment URL, then fall back to localhost in dev.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - adds token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('gh_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('📤 API Request:', config.method.toUpperCase(), config.baseURL + config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handles auth errors globally
api.interceptors.response.use(
    (response) => {
        console.log('📥 API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            localStorage.removeItem('gh_token');
            localStorage.removeItem('gh_user');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;