import { z } from 'zod';
import { VALIDATION, USER_ROLES } from '../constants/validation.constants';

// Base user schema
export const userBaseSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.NAME.MIN_LENGTH, VALIDATION.NAME.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.NAME.MAX_LENGTH, VALIDATION.NAME.MESSAGES.MAX_LENGTH)
    .regex(VALIDATION.NAME.PATTERN, VALIDATION.NAME.MESSAGES.PATTERN),
  
  email: z
    .string()
    .email(VALIDATION.EMAIL.MESSAGES.INVALID)
    .toLowerCase(),
  
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.USER]).default(USER_ROLES.USER),
});

// Create user schema (includes password)
export const createUserSchema = userBaseSchema.extend({
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN_LENGTH, VALIDATION.PASSWORD.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.PASSWORD.MAX_LENGTH, VALIDATION.PASSWORD.MESSAGES.MAX_LENGTH),
});

// Update user schema (optional password)
export const updateUserSchema = userBaseSchema.extend({
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN_LENGTH, VALIDATION.PASSWORD.MESSAGES.MIN_LENGTH)
    .max(VALIDATION.PASSWORD.MAX_LENGTH, VALIDATION.PASSWORD.MESSAGES.MAX_LENGTH)
    .optional()
    .or(z.literal('')),
  
  changePassword: z.boolean().optional(),
});

// Transform empty string to undefined for optional fields
export const updateUserSchemaWithTransform = updateUserSchema.transform((data) => {
  if (data.password === '') {
    const { password, ...rest } = data;
    return rest;
  }
  return data;
});