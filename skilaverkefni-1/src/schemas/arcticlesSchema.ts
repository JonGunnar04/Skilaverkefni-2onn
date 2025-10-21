import { z } from 'zod';

export const createArticleRequest = z.object({
  title: z.string().max(100, 'Maximum of 100 letters!'),
  content: z.string().min(10, 'Minimum of 10 letters!'),
  authorId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      'Invalid UUID format'
    ),
});
