import api, { API_ENDPOINTS } from '../config';
import { 
  Task, 
  TaskFormData, 
  TaskFilters, 
  TaskPhoto, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';

export const taskService = {
  /**
   * Get all tasks with optional filters
   */
  getTasks: async (filters?: TaskFilters, page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Task>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.status && { status: filters.status.join(',') }),
      ...(filters?.serviceType && { serviceType: filters.serviceType.join(',') }),
      ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      ...(filters?.dateTo && { dateTo: filters.dateTo }),
      ...(filters?.customerId && { customerId: filters.customerId }),
      ...(filters?.dasherId && { dasherId: filters.dasherId }),
    });

    const response = await api.get(`${API_ENDPOINTS.TASKS.LIST}?${params}`);
    return response.data;
  },

  /**
   * Get task by ID
   */
  getTask: async (id: string): Promise<ApiResponse<Task>> => {
    const response = await api.get(API_ENDPOINTS.TASKS.DETAIL(id));
    return response.data;
  },

  /**
   * Create new task
   */
  createTask: async (taskData: TaskFormData): Promise<ApiResponse<Task>> => {
    const response = await api.post(API_ENDPOINTS.TASKS.CREATE, taskData);
    return response.data;
  },

  /**
   * Update task
   */
  updateTask: async (id: string, taskData: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
    const response = await api.put(API_ENDPOINTS.TASKS.UPDATE(id), taskData);
    return response.data;
  },

  /**
   * Delete task
   */
  deleteTask: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(API_ENDPOINTS.TASKS.DELETE(id));
    return response.data;
  },

  /**
   * Accept task (for dashers)
   */
  acceptTask: async (id: string): Promise<ApiResponse<Task>> => {
    const response = await api.post(API_ENDPOINTS.TASKS.ACCEPT(id));
    return response.data;
  },

  /**
   * Start task (for dashers)
   */
  startTask: async (id: string): Promise<ApiResponse<Task>> => {
    const response = await api.post(API_ENDPOINTS.TASKS.START(id));
    return response.data;
  },

  /**
   * Complete task (for dashers)
   */
  completeTask: async (id: string, photos?: File[]): Promise<ApiResponse<Task>> => {
    const formData = new FormData();
    if (photos) {
      photos.forEach((photo, index) => {
        formData.append(`photos`, photo);
      });
    }

    const response = await api.post(API_ENDPOINTS.TASKS.COMPLETE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Cancel task
   */
  cancelTask: async (id: string, reason?: string): Promise<ApiResponse<Task>> => {
    const response = await api.post(API_ENDPOINTS.TASKS.CANCEL(id), { reason });
    return response.data;
  },

  /**
   * Upload task photos
   */
  uploadTaskPhotos: async (taskId: string, photos: File[], type: 'before' | 'after' | 'issue'): Promise<ApiResponse<TaskPhoto[]>> => {
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    formData.append('type', type);

    const response = await api.post(API_ENDPOINTS.TASKS.PHOTOS(taskId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get available tasks for dashers
   */
  getAvailableTasks: async (latitude: number, longitude: number, radius = 10): Promise<ApiResponse<Task[]>> => {
    const response = await api.get('/tasks/available', {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },

  /**
   * Rate task (for customers)
   */
  rateTask: async (taskId: string, rating: number, review?: string): Promise<ApiResponse<Task>> => {
    const response = await api.post(`/tasks/${taskId}/rate`, { rating, review });
    return response.data;
  },

  /**
   * Get task statistics
   */
  getTaskStats: async (filters?: TaskFilters): Promise<ApiResponse<{
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    inProgress: number;
  }>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const response = await api.get(`/tasks/stats?${params}`);
    return response.data;
  },

  /**
   * Get recurring tasks
   */
  getRecurringTasks: async (): Promise<ApiResponse<Task[]>> => {
    const response = await api.get('/tasks/recurring');
    return response.data;
  },

  /**
   * Update recurring task configuration
   */
  updateRecurringTask: async (taskId: string, recurringConfig: any): Promise<ApiResponse<Task>> => {
    const response = await api.put(`/tasks/${taskId}/recurring`, recurringConfig);
    return response.data;
  },

  /**
   * Cancel recurring task series
   */
  cancelRecurringTask: async (taskId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/tasks/${taskId}/recurring`);
    return response.data;
  },
}; 