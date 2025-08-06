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
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('dasher_token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('dasher_token') : false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('Dasher login attempt with:', credentials);
      const response = await authService.login(credentials);
      console.log('Dasher login response:', response);
      
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
        console.error('Unexpected dasher response format:', response);
        set({
          isLoading: false,
          error: 'Invalid response format from server',
        });
        return { success: false, error: 'Invalid response format from server' };
      }

      if (user && token) {
        // Verify dasher role
        if (user.role !== 'dasher') {
          set({
            isLoading: false,
            error: 'Access denied. Dasher privileges required.',
          });
          return { success: false, error: 'Access denied. Dasher privileges required.' };
        }

        localStorage.setItem('dasher_token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        console.log('Dasher login successful:', user);
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: 'Missing user data or token',
        });
        return { success: false, error: 'Missing user data or token' };
      }
    } catch (error: any) {
      console.error('Dasher login error:', error);
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
      console.error('Dasher logout API error:', error);
    } finally {
      localStorage.removeItem('dasher_token');
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

  refreshAuth: async () => {
    const token = localStorage.getItem('dasher_token');
    if (token && !get().user) {
      try {
        await get().getProfile();
      } catch (error) {
        console.error('Failed to refresh dasher auth:', error);
        // If refresh fails, clear the token
        localStorage.removeItem('dasher_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      }
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
export { useAuthStore }; 