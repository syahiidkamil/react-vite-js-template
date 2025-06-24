// Validation rules and messages
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGES: {
      REQUIRED: 'Password is required',
      MIN_LENGTH: 'Password must be at least 6 characters',
      MAX_LENGTH: 'Password must not exceed 128 characters',
      PATTERN: 'Password must contain uppercase, lowercase, number and special character',
      MISMATCH: 'Passwords do not match',
    },
  },
  
  EMAIL: {
    PATTERN: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    MESSAGES: {
      REQUIRED: 'Email is required',
      INVALID: 'Please enter a valid email address',
    },
  },
  
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s'-]+$/,
    MESSAGES: {
      REQUIRED: 'Name is required',
      MIN_LENGTH: 'Name must be at least 2 characters',
      MAX_LENGTH: 'Name must not exceed 100 characters',
      PATTERN: 'Name can only contain letters, spaces, hyphens and apostrophes',
    },
  },
  
  OTP: {
    LENGTH: 6,
    PATTERN: /^\d{6}$/,
    MESSAGES: {
      REQUIRED: 'OTP is required',
      INVALID: 'OTP must be 6 digits',
    },
  },
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred',
  NETWORK: 'Network error. Please check your connection',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SESSION_EXPIRED: 'Your session has expired. Please login again',
  VALIDATION_FAILED: 'Please check your input and try again',
};