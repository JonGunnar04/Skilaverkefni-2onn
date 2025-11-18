import { z } from 'zod';

export const createRecipeRequest = z.object({
  title: z
    .string()
    .min(1, 'Recipe title required')
    .max(255, 'Title has to be less than 255 characters'),
  description: z
    .string()
    .min(1, 'Recipe description required')
    .max(255, 'Description has to be less than 255 characters'),
  cook_time_minutes: z.number().min(1, 'Cook time must be a positive number'),
  difficulty: z
    .string()
    .min(1, 'Recipe difficulty Required')
    .max(50, 'Difficulty has to be less than 50 characters'),
  rating: z
    .number()
    .min(0, 'Recipe rating must be a positive number')
    .max(5, 'Rating equal to or less than 5'),
  cuisine_id: z.string().min(1, 'Cuisine ID must be a positive number'),
});
/**
  title: string,
  description: string,
  cook_time_minutes: number,
  difficulty: string,
  rating: number,
  cuisine_id: string
 */

/* 
CREATE TABLE recipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cook_time_minutes INTEGER,
    difficulty VARCHAR(50),
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    cuisine_id BIGINT NOT NULL,

    FOREIGN KEY (cuisine_id) REFERENCES cuisines(id) ON DELETE CASCADE
);
*/
