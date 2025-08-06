import axios from 'axios';

// Hardcoded API configuration
const API_BASE_URL = 'https://trashdash-backend-7188044708.us-central1.run.app/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  TASKS: {
    LIST: '/tasks',
    DETAIL: (id: string) => `/tasks/${id}`,
    UPDATE_STATUS: (id: string) => `/tasks/${id}/status`,
    UPLOAD_PHOTO: (id: string) => `/tasks/${id}/photos`,
  },
  DASHER: {
    PROFILE: '/dasher/profile',
    EARNINGS: '/dasher/earnings',
    STATS: '/dasher/stats',
  },
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('dasher_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dasher_token');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 