import api, { API_ENDPOINTS } from '../config';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  User, 
  UserProfileFormData,
  ApiResponse 
} from '../types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UserProfileFormData): Promise<ApiResponse<User>> => {
    const response = await api.put(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data;
  },

  /**
   * Update push notification token
   */
  updatePushToken: async (pushToken: string): Promise<ApiResponse<void>> => {
    const response = await api.put(API_ENDPOINTS.AUTH.PUSH_TOKEN, { pushToken });
    return response.data;
  },

  /**
   * Verify phone number with OTP
   */
  verifyPhone: async (phone: string, otp: string): Promise<ApiResponse<void>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_PHONE, { phone, otp });
    return response.data;
  },

  /**
   * Resend phone verification OTP
   */
  resendVerification: async (phone: string): Promise<ApiResponse<void>> => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { phone });
    return response.data;
  },

  /**
   * Upload profile photo
   */
  uploadProfilePhoto: async (file: File): Promise<ApiResponse<{ photoUrl: string }>> => {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await api.post('/auth/profile-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<ApiResponse<void>> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<void>> => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },

  /**
   * Delete account
   */
  deleteAccount: async (password: string): Promise<ApiResponse<void>> => {
    const response = await api.delete('/auth/account', {
      data: { password },
    });
    return response.data;
  },
}; 