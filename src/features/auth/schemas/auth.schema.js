import { z } from 'zod';
import { VALIDATION } from '../../../shared/constants/validation.constants';

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION.EMAIL.MESSAGES.REQUIRED)
    .email(VALIDATION.EMAIL.MESSAGES.INVALID)
    .toLowerCase(),
  
  password: z
    .string()
    .min(1, VALIDATION.PASSWORD.MESSAGES.REQUIRED),
});

// Register schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION.NAME.MESSAGES.REQUIRED)
    .min(VALIDATION.NAME.MIN_LENGTH, VALIDATION.NAME.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.NAME.MAX_LENGTH, VALIDATION.NAME.MESSAGES.MAX_LENGTH)
    .regex(VALIDATION.NAME.PATTERN, VALIDATION.NAME.MESSAGES.PATTERN),
  
  email: z
    .string()
    .min(1, VALIDATION.EMAIL.MESSAGES.REQUIRED)
    .email(VALIDATION.EMAIL.MESSAGES.INVALID)
    .toLowerCase(),
  
  password: z
    .string()
    .min(1, VALIDATION.PASSWORD.MESSAGES.REQUIRED)
    .min(VALIDATION.PASSWORD.MIN_LENGTH, VALIDATION.PASSWORD.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.PASSWORD.MAX_LENGTH, VALIDATION.PASSWORD.MESSAGES.MAX_LENGTH),
  
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION.PASSWORD.MESSAGES.MISMATCH,
  path: ['confirmPassword'],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION.EMAIL.MESSAGES.REQUIRED)
    .email(VALIDATION.EMAIL.MESSAGES.INVALID)
    .toLowerCase(),
});

// OTP verification schema
export const otpSchema = z.object({
  otp: z
    .string()
    .length(VALIDATION.OTP.LENGTH, VALIDATION.OTP.MESSAGES.INVALID)
    .regex(VALIDATION.OTP.PATTERN, VALIDATION.OTP.MESSAGES.INVALID),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, VALIDATION.PASSWORD.MESSAGES.REQUIRED)
    .min(VALIDATION.PASSWORD.MIN_LENGTH, VALIDATION.PASSWORD.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.PASSWORD.MAX_LENGTH, VALIDATION.PASSWORD.MESSAGES.MAX_LENGTH),
  
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION.PASSWORD.MESSAGES.MISMATCH,
  path: ['confirmPassword'],
});