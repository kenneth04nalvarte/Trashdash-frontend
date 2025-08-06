import api, { API_ENDPOINTS } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
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
   * Login dasher with email and password
   */
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Logout dasher
   */
  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  /**
   * Get current dasher profile
   */
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  /**
   * Update dasher profile
   */
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data;
  },

  /**
   * Get dasher earnings
   */
  getEarnings: async () => {
    const response = await api.get(API_ENDPOINTS.DASHER.EARNINGS);
    return response.data;
  },

  /**
   * Get dasher statistics
   */
  getStats: async () => {
    const response = await api.get(API_ENDPOINTS.DASHER.STATS);
    return response.data;
  },
}; 