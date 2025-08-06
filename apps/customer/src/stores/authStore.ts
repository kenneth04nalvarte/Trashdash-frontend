import { create } from 'zustand';
import { authService, LoginCredentials, RegisterData, User } from '../services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getProfile: () => Promise<{ success: boolean; error?: string }>;
  refreshAuth: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('Attempting login with:', credentials);
      const response = await authService.login(credentials);
      console.log('Login response:', response);
      
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
        console.error('Unexpected response format:', response);
        set({
          isLoading: false,
          error: 'Invalid response format from server',
        });
        return { success: false, error: 'Invalid response format from server' };
      }

      if (user && token) {
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        console.log('Login successful, user authenticated:', user);
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: 'Missing user data or token',
        });
        return { success: false, error: 'Missing user data or token' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },

  register: async (userData: RegisterData) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('Attempting registration with:', userData);
      const response = await authService.register(userData);
      console.log('Registration response:', response);
      
      // Handle different response formats
      let user, token;
      
      if (response.success && response.data) {
        user = response.data.user;
        token = response.data.token;
      } else if (response.user && response.token) {
        user = response.user;
        token = response.token;
      } else if (response.data && response.data.user && response.data.token) {
        user = response.data.user;
        token = response.data.token;
      } else {
        console.error('Unexpected registration response format:', response);
        set({
          isLoading: false,
          error: 'Invalid response format from server',
        });
        return { success: false, error: 'Invalid response format from server' };
      }

      if (user && token) {
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: 'Missing user data or token',
        });
        return { success: false, error: 'Missing user data or token' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Registration failed';
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
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
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
    const token = localStorage.getItem('token');
    if (token && !get().user) {
      try {
        await get().getProfile();
      } catch (error) {
        console.error('Failed to refresh auth:', error);
        // If refresh fails, clear the token
        localStorage.removeItem('token');
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