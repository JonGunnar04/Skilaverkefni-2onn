import { z } from 'zod';

export const createCuisineRequest = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name too long')
    .describe('Name already exists'),
});
