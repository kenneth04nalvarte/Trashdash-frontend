import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Environment configuration
const API_BASE_URL = 'https://trashdash-backend-7188044708.us-central1.run.app/api';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

// Google Maps configuration
const GOOGLE_MAPS_API_KEY = 'AIzaSyAtiOmzWU8hbyTn-mj0Dcc_c_9qH_I5zIE';

// Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Stripe configuration
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

// Analytics configuration
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

export const config = {
  API_BASE_URL,
  API_VERSION,
  GOOGLE_MAPS_API_KEY,
  FIREBASE_CONFIG,
  STRIPE_PUBLIC_KEY,
  GA_TRACKING_ID,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login if in browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    // Log error for debugging
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

// API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    PUSH_TOKEN: '/auth/push-token',
    VERIFY_PHONE: '/auth/verify-phone',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  
  // User management
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    ADDRESSES: (id: string) => `/users/${id}/addresses`,
  },
  
  // Tasks
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    DETAIL: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
    ACCEPT: (id: string) => `/tasks/${id}/accept`,
    START: (id: string) => `/tasks/${id}/start`,
    COMPLETE: (id: string) => `/tasks/${id}/complete`,
    CANCEL: (id: string) => `/tasks/${id}/cancel`,
    PHOTOS: (id: string) => `/tasks/${id}/photos`,
  },
  
  // Addresses
  ADDRESSES: {
    LIST: '/addresses',
    CREATE: '/addresses',
    DETAIL: (id: string) => `/addresses/${id}`,
    UPDATE: (id: string) => `/addresses/${id}`,
    DELETE: (id: string) => `/addresses/${id}`,
    VALIDATE: '/addresses/validate',
  },
  
  // Payments
  PAYMENTS: {
    METHODS: '/payments/methods',
    CREATE_METHOD: '/payments/methods',
    DELETE_METHOD: (id: string) => `/payments/methods/${id}`,
    CHARGE: '/payments/charge',
    HISTORY: '/payments/history',
    RECEIPT: (id: string) => `/payments/receipts/${id}`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    PREFERENCES: '/notifications/preferences',
  },
  
  // Analytics (Admin only)
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    REVENUE: '/analytics/revenue',
    USERS: '/analytics/users',
    TASKS: '/analytics/tasks',
    DASHERS: '/analytics/dashers',
  },
  
  // Admin endpoints
  ADMIN: {
    USERS: '/admin/users',
    TASKS: '/admin/tasks',
    DASHERS: '/admin/dashers',
    SETTINGS: '/admin/settings',
  },
} as const;

export default api; 