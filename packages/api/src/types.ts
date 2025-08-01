// Base types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneVerified: boolean;
  role: UserRole;
  status: UserStatus;
  profilePhoto?: string;
  pushToken?: string;
  notificationPreferences: NotificationPreferences;
  defaultAddressId?: string;
}

export enum UserRole {
  CUSTOMER = 'customer',
  DASHER = 'dasher',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

// Address types
export interface Address extends BaseEntity {
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  gateCode?: string;
  specialInstructions?: string;
  formattedAddress: string;
}

// Task types
export interface Task extends BaseEntity {
  customerId: string;
  dasherId?: string;
  addressId: string;
  serviceType: ServiceType;
  status: TaskStatus;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  price: number;
  tip?: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  recurring?: RecurringConfig;
  photos: TaskPhoto[];
  notes?: string;
  customerRating?: number;
  customerReview?: string;
  dasherRating?: number;
  dasherReview?: string;
  address: Address;
  customer: User;
  dasher?: User;
}

export enum ServiceType {
  TAKE_OUT = 'take_out',
  RETURN = 'return',
  ROUND_TRIP = 'round_trip',
  WASH = 'wash',
}

export enum TaskStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface RecurringConfig {
  frequency: RecurringFrequency;
  interval: number;
  endDate?: string;
  maxOccurrences?: number;
}

export enum RecurringFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface TaskPhoto extends BaseEntity {
  taskId: string;
  url: string;
  type: PhotoType;
  uploadedBy: string;
}

export enum PhotoType {
  BEFORE = 'before',
  AFTER = 'after',
  ISSUE = 'issue',
}

// Payment types
export interface PaymentMethod extends BaseEntity {
  userId: string;
  type: PaymentMethodType;
  last4: string;
  brand: string;
  isDefault: boolean;
  expiryMonth: number;
  expiryYear: number;
}

export enum PaymentMethodType {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_ACCOUNT = 'bank_account',
}

export interface Payment extends BaseEntity {
  userId: string;
  taskId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  receiptUrl?: string;
}

// Notification types
export interface Notification extends BaseEntity {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  sentAt: string;
}

export enum NotificationType {
  TASK_ASSIGNED = 'task_assigned',
  TASK_STARTED = 'task_started',
  TASK_COMPLETED = 'task_completed',
  TASK_CANCELLED = 'task_cancelled',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  SYSTEM_UPDATE = 'system_update',
  PROMOTIONAL = 'promotional',
}

// Authentication types
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
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter and query types
export interface TaskFilters {
  status?: TaskStatus[];
  serviceType?: ServiceType[];
  dateFrom?: string;
  dateTo?: string;
  customerId?: string;
  dasherId?: string;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus[];
  search?: string;
}

// Analytics types
export interface DashboardStats {
  totalUsers: number;
  totalTasks: number;
  totalRevenue: number;
  activeDashers: number;
  completedTasksToday: number;
  revenueToday: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  tasks: number;
}

export interface UserGrowthData {
  date: string;
  newUsers: number;
  totalUsers: number;
}

// Form types
export interface TaskFormData {
  serviceType: ServiceType;
  addressId: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
  recurring?: RecurringConfig;
}

export interface AddressFormData {
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  gateCode?: string;
  specialInstructions?: string;
  isDefault: boolean;
}

export interface UserProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  notificationPreferences: NotificationPreferences;
} 