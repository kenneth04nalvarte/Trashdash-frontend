// Service Types
export const SERVICE_TYPES = {
  TAKE_OUT: 'take_out',
  RETURN: 'return',
  ROUND_TRIP: 'round_trip',
  WASH: 'wash',
} as const;

// Task Status
export const TASK_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  DASHER: 'dasher',
  ADMIN: 'admin',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  TASK_STARTED: 'task_started',
  TASK_COMPLETED: 'task_completed',
  TASK_CANCELLED: 'task_cancelled',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  SYSTEM_UPDATE: 'system_update',
  PROMOTIONAL: 'promotional',
} as const;

// Service Pricing (in USD)
export const SERVICE_PRICING = {
  [SERVICE_TYPES.TAKE_OUT]: 15.00,
  [SERVICE_TYPES.RETURN]: 15.00,
  [SERVICE_TYPES.ROUND_TRIP]: 25.00,
  [SERVICE_TYPES.WASH]: 20.00,
} as const;

// Estimated Service Duration (in minutes)
export const SERVICE_DURATION = {
  [SERVICE_TYPES.TAKE_OUT]: 15,
  [SERVICE_TYPES.RETURN]: 15,
  [SERVICE_TYPES.ROUND_TRIP]: 30,
  [SERVICE_TYPES.WASH]: 45,
} as const;

// Task Status Labels
export const TASK_STATUS_LABELS = {
  [TASK_STATUS.PENDING]: 'Pending',
  [TASK_STATUS.ASSIGNED]: 'Assigned',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
  [TASK_STATUS.CANCELLED]: 'Cancelled',
  [TASK_STATUS.FAILED]: 'Failed',
} as const;

// Service Type Labels
export const SERVICE_TYPE_LABELS = {
  [SERVICE_TYPES.TAKE_OUT]: 'Take Out',
  [SERVICE_TYPES.RETURN]: 'Return',
  [SERVICE_TYPES.ROUND_TRIP]: 'Round Trip',
  [SERVICE_TYPES.WASH]: 'Wash',
} as const;

// User Role Labels
export const USER_ROLE_LABELS = {
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.DASHER]: 'Dasher',
  [USER_ROLES.ADMIN]: 'Admin',
} as const;

// Payment Status Labels
export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PAID]: 'Paid',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.REFUNDED]: 'Refunded',
} as const;

// Notification Type Labels
export const NOTIFICATION_TYPE_LABELS = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: 'Task Assigned',
  [NOTIFICATION_TYPES.TASK_STARTED]: 'Task Started',
  [NOTIFICATION_TYPES.TASK_COMPLETED]: 'Task Completed',
  [NOTIFICATION_TYPES.TASK_CANCELLED]: 'Task Cancelled',
  [NOTIFICATION_TYPES.PAYMENT_SUCCESS]: 'Payment Success',
  [NOTIFICATION_TYPES.PAYMENT_FAILED]: 'Payment Failed',
  [NOTIFICATION_TYPES.SYSTEM_UPDATE]: 'System Update',
  [NOTIFICATION_TYPES.PROMOTIONAL]: 'Promotional',
} as const;

// Task Status Colors
export const TASK_STATUS_COLORS = {
  [TASK_STATUS.PENDING]: '#FFA500',
  [TASK_STATUS.ASSIGNED]: '#007BFF',
  [TASK_STATUS.IN_PROGRESS]: '#28A745',
  [TASK_STATUS.COMPLETED]: '#6C757D',
  [TASK_STATUS.CANCELLED]: '#DC3545',
  [TASK_STATUS.FAILED]: '#DC3545',
} as const;

// Service Type Colors
export const SERVICE_TYPE_COLORS = {
  [SERVICE_TYPES.TAKE_OUT]: '#28A745',
  [SERVICE_TYPES.RETURN]: '#007BFF',
  [SERVICE_TYPES.ROUND_TRIP]: '#FFC107',
  [SERVICE_TYPES.WASH]: '#17A2B8',
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES: 5,
} as const;

// Location
export const LOCATION = {
  DEFAULT_RADIUS: 10, // km
  MAX_RADIUS: 50, // km
  UPDATE_INTERVAL: 30000, // 30 seconds
} as const;

// Time
export const TIME = {
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_PASSWORD: 'Password must be at least 8 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_ZIP_CODE: 'Please enter a valid ZIP code',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'Please upload a valid image file',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  REGISTER_SUCCESS: 'Account created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  ADDRESS_ADDED: 'Address added successfully',
  ADDRESS_UPDATED: 'Address updated successfully',
  ADDRESS_DELETED: 'Address deleted successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  NOTIFICATION_SENT: 'Notification sent successfully',
} as const; 