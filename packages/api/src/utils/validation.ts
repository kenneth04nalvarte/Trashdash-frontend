import { VALIDATION, ERROR_MESSAGES, FILE_UPLOAD } from '../utils/constants';

// Email validation
export const isValidEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

// Password validation
export const isValidPassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
    errors.push(`Password must be less than ${VALIDATION.PASSWORD_MAX_LENGTH} characters`);
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ZIP code validation
export const isValidZipCode = (zipCode: string): boolean => {
  return VALIDATION.ZIP_CODE_REGEX.test(zipCode);
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

// File validation
export const isValidFile = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    return { isValid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }
  
  if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE };
  }
  
  return { isValid: true };
};

// Address validation
export const validateAddress = (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!isRequired(address.street)) {
    errors.street = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(address.city)) {
    errors.city = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(address.state)) {
    errors.state = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(address.zipCode)) {
    errors.zipCode = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidZipCode(address.zipCode)) {
    errors.zipCode = ERROR_MESSAGES.INVALID_ZIP_CODE;
  }
  
  if (!isRequired(address.country)) {
    errors.country = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Task form validation
export const validateTaskForm = (task: {
  serviceType: string;
  addressId: string;
  scheduledDate: string;
  scheduledTime: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!isRequired(task.serviceType)) {
    errors.serviceType = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(task.addressId)) {
    errors.addressId = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(task.scheduledDate)) {
    errors.scheduledDate = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(task.scheduledTime)) {
    errors.scheduledTime = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// User registration validation
export const validateRegistration = (user: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!isRequired(user.email)) {
    errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidEmail(user.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }
  
  if (!isRequired(user.password)) {
    errors.password = ERROR_MESSAGES.REQUIRED_FIELD;
  } else {
    const passwordValidation = isValidPassword(user.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }
  }
  
  if (!isRequired(user.confirmPassword)) {
    errors.confirmPassword = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (user.password !== user.confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
  }
  
  if (!isRequired(user.firstName)) {
    errors.firstName = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(user.lastName)) {
    errors.lastName = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!isRequired(user.phone)) {
    errors.phone = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidPhone(user.phone)) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Login validation
export const validateLogin = (credentials: {
  email: string;
  password: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!isRequired(credentials.email)) {
    errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!isValidEmail(credentials.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }
  
  if (!isRequired(credentials.password)) {
    errors.password = ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as +X (XXX) XXX-XXXX for international numbers
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if can't format
};

// Date validation
export const isValidDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

// Future date validation
export const isFutureDate = (date: string): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

// Time validation
export const isValidTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

// Business hours validation (assuming 6 AM to 10 PM)
export const isWithinBusinessHours = (time: string): boolean => {
  const [hours] = time.split(':').map(Number);
  return hours >= 6 && hours <= 22;
};

// Coordinate validation
export const isValidLatitude = (lat: number): boolean => {
  return lat >= -90 && lat <= 90;
};

export const isValidLongitude = (lng: number): boolean => {
  return lng >= -180 && lng <= 180;
};

// Price validation
export const isValidPrice = (price: number): boolean => {
  return price >= 0 && price <= 10000; // Max $10,000
};

// Rating validation
export const isValidRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
}; 