import api, { API_ENDPOINTS } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  status: string;
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data;
  },
}; 