import { z } from 'zod';

export const createAuthorRequest = z.object({
  name: z.string().min(1).max(100, 'Maximum of 100 letters!'),
  email: z.string().email('Invalid Email!'),
  bio: z.string().optional(),
});

export const UUIDParams = z.object({
  id: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      'Invalid UUID format'
    ),
});
