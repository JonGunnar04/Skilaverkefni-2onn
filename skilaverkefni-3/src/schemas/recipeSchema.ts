import { z } from 'zod';

export const createRecipeRequest = z.object({
  title: z
    .string()
    .min(1, 'Recipe title required')
    .max(255, 'Title has to be less than 255 characters'),

  description: z
    .string()
    .min(1, 'Recipe description required')
    .max(255, 'Description has to be less than 255 characters')
    .optional(),

  cook_time_minutes: z
    .number()
    .min(1, 'Cook time must be a positive number')
    .optional(),

  difficulty: z
    .string()
    .min(1, 'Recipe difficulty Required')
    .max(50, 'Difficulty has to be less than 50 characters')
    .optional(),

  rating: z
    .number()
    .min(0, 'Recipe rating must be a positive number')
    .max(5, 'Rating equal to or less than 5')
    .optional(),

  cuisine_id: z.number().min(1, 'Cuisine ID must be a positive number'),
});
