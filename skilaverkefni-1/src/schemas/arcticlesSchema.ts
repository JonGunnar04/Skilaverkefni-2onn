import { z } from 'zod';

export const createArticleRequest = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Maximum of 100 letters!'),
  content: z.string().min(10, 'Content must be atleast 10 characters'),
  authorId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      'Invalid UUID format'
    ),
});
