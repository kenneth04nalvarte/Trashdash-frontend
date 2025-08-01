import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';
import { User, LoginCredentials, RegisterData, UserProfileFormData } from '../types';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAuth: () => Promise<{ success: boolean; error?: string }>;
  getProfile: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: UserProfileFormData) => Promise<{ success: boolean; error?: string }>;
  updatePushToken: (token: string) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login(credentials);
          
          if (response.success) {
            const { user, token, refreshToken } = response.data;
            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Login failed',
            });
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || error.message || 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Register action
      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(userData);
          
          if (response.success) {
            const { user, token, refreshToken } = response.data;
            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Registration failed',
            });
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || error.message || 'Registration failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Logout action
      logout: async () => {
        try {
          // Call logout API if user is authenticated
          if (get().isAuthenticated) {
            await authService.logout();
          }
        } catch (error) {
          console.error('Logout API error:', error);
        } finally {
          // Clear local state regardless of API call success
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Refresh authentication
      refreshAuth: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          return { success: false, error: 'No refresh token available' };
        }

        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.refreshToken(refreshToken);
          
          if (response.success) {
            const { user, token, refreshToken: newRefreshToken } = response.data;
            set({
              user,
              token,
              refreshToken: newRefreshToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Token refresh failed',
            });
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || error.message || 'Token refresh failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Get user profile
      getProfile: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.getProfile();
          
          if (response.success) {
            set({
              user: response.data,
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
          const errorMessage = error.response?.data?.error || error.message || 'Failed to get profile';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Update user profile
      updateProfile: async (data: UserProfileFormData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.updateProfile(data);
          
          if (response.success) {
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });
            return { success: true };
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to update profile',
            });
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || error.message || 'Failed to update profile';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Update push token
      updatePushToken: async (token: string) => {
        try {
          const response = await authService.updatePushToken(token);
          
          if (response.success) {
            // Update user's push token in state
            const { user } = get();
            if (user) {
              set({
                user: { ...user, pushToken: token },
              });
            }
            return { success: true };
          } else {
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || error.message || 'Failed to update push token';
          return { success: false, error: errorMessage };
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 