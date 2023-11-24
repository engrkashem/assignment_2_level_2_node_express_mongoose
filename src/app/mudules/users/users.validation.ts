import { z } from 'zod';

// Define sub-schemas
const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).max(20),
  lastName: z.string().trim().min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string().trim().min(1),
  city: z.string().trim().min(1),
  country: z.string().trim().min(1),
});

export const orderValidationSchema = z.object({
  productName: z.string().trim().min(1),
  price: z.number(),
  quantity: z.number(),
});

// Define main schema
export const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim().min(1),
  password: z.string().min(3).max(20),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email().trim(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
