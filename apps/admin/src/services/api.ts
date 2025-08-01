import axios from 'axios';

// API Configuration for Admin Panel
const API_BASE_URL = 'https://trashdash-backend-7188044708.us-central1.run.app/api';

console.log('Admin API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Admin API Request:', config.method?.toUpperCase(), config.url, config.data);
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Admin API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('Admin API Error:', error.response?.status, error.config?.url, error.response?.data);
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('admin_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Admin API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  
  // Admin Dashboard
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ANALYTICS: '/admin/analytics',
    SYSTEM_STATUS: '/admin/system-status',
  },
  
  // User Management
  USERS: {
    LIST: '/admin/users',
    CREATE: '/admin/users',
    DETAIL: (id: string) => `/admin/users/${id}`,
    UPDATE: (id: string) => `/admin/users/${id}`,
    DELETE: (id: string) => `/admin/users/${id}`,
    BULK_ACTIONS: '/admin/users/bulk-actions',
  },
  
  // Task Management
  TASKS: {
    LIST: '/admin/tasks',
    CREATE: '/admin/tasks',
    DETAIL: (id: string) => `/admin/tasks/${id}`,
    UPDATE: (id: string) => `/admin/tasks/${id}`,
    DELETE: (id: string) => `/admin/tasks/${id}`,
    ASSIGN: (id: string) => `/admin/tasks/${id}/assign`,
    BULK_ACTIONS: '/admin/tasks/bulk-actions',
  },
  
  // Dasher Management
  DASHERS: {
    LIST: '/admin/dashers',
    CREATE: '/admin/dashers',
    DETAIL: (id: string) => `/admin/dashers/${id}`,
    UPDATE: (id: string) => `/admin/dashers/${id}`,
    DELETE: (id: string) => `/admin/dashers/${id}`,
    PERFORMANCE: (id: string) => `/admin/dashers/${id}/performance`,
    LOCATION: (id: string) => `/admin/dashers/${id}/location`,
  },
  
  // Customer Management
  CUSTOMERS: {
    LIST: '/admin/customers',
    DETAIL: (id: string) => `/admin/customers/${id}`,
    UPDATE: (id: string) => `/admin/customers/${id}`,
    SUSPEND: (id: string) => `/admin/customers/${id}/suspend`,
    ACTIVATE: (id: string) => `/admin/customers/${id}/activate`,
  },
  
  // Reports & Analytics
  REPORTS: {
    REVENUE: '/admin/reports/revenue',
    TASKS: '/admin/reports/tasks',
    PERFORMANCE: '/admin/reports/performance',
    CUSTOMER_SATISFACTION: '/admin/reports/satisfaction',
  },
  
  // System Settings
  SETTINGS: {
    GENERAL: '/admin/settings/general',
    PAYMENT: '/admin/settings/payment',
    NOTIFICATIONS: '/admin/settings/notifications',
    INTEGRATIONS: '/admin/settings/integrations',
  },
  
  // Health check
  HEALTH: '/health',
};

export default api; 