import { create } from 'zustand';
import { authService, LoginCredentials, User } from '../services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getProfile: () => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('admin_token') : false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('Admin login attempt with:', credentials);
      const response = await authService.login(credentials);
      console.log('Admin login response:', response);
      
      // Handle different response formats from your backend
      let user, token;
      
      if (response.success && response.data) {
        // Format: { success: true, data: { user, token } }
        user = response.data.user;
        token = response.data.token;
      } else if (response.user && response.token) {
        // Format: { user, token }
        user = response.user;
        token = response.token;
      } else if (response.data && response.data.user && response.data.token) {
        // Format: { data: { user, token } }
        user = response.data.user;
        token = response.data.token;
      } else if (response.accessToken) {
        // Format: { accessToken, user }
        user = response.user;
        token = response.accessToken;
      } else if (response.token) {
        // Format: { token, user }
        user = response.user;
        token = response.token;
      } else {
        console.error('Unexpected admin response format:', response);
        set({
          isLoading: false,
          error: 'Invalid response format from server',
        });
        return { success: false, error: 'Invalid response format from server' };
      }

      if (user && token) {
        // Verify admin role
        if (user.role !== 'admin') {
          set({
            isLoading: false,
            error: 'Access denied. Admin privileges required.',
          });
          return { success: false, error: 'Access denied. Admin privileges required.' };
        }

        localStorage.setItem('admin_token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        console.log('Admin login successful:', user);
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: 'Missing user data or token',
        });
        return { success: false, error: 'Missing user data or token' };
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Admin logout API error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  getProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        set({
          user: response.data,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } else if (response.user) {
        set({
          user: response.user,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: response.error || 'Failed to get profile',
        });
        return { success: false, error: response.error };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to get profile';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore; 