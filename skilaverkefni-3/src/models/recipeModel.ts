import pool from '../config/db.js';

export interface Recipes {
  id: string;
  title: string;
  description: string;
  cook_time_minutes: number;
  difficulty: string;
  rating: number;
  created_at: string;
  cuisine_id: string;
}

// GET all recipes
export const getAllRecipes = async (): Promise<Recipes[]> => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    console.log('Recipes fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading all Recipes' + err);
  }
};

// GET recipe by id
export const getRecipeById = async (id: string): Promise<Recipes[]> => {
  try {
    const result = await pool.query(`SELECT * FROM recipes WHERE id = ${id}`);
    console.log('Recipes fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading all Recipes' + err);
  }
};

// POST create a new recipe
export const createRecipe = async (
  title: string,
  description: string,
  cook_time_minutes: number,
  difficulty: string,
  rating: number,
  cuisine_id: string
): Promise<Recipes[]> => {
  try {
    const result = await pool.query(`INSERT INTO recipes (title, description, cook_time_minutes, difficulty, rating, cuisine_id) VALUES ('${title}', '${description}', ${cook_time_minutes}, '${difficulty}', ${rating}, '${cuisine_id}') RETURNING *;`);
    console.log('Recipes created successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error creating a Recipes' + err);
  }
};

// PUT update a recipe
export const updateRecipe = async (
  id: string,
  title: string,
  description: string,
  cook_time_minutes: number,
  difficulty: string,
  rating: number,
  cuisine_id: string
): Promise<Recipes[]> => {
  try {
    const result = await pool.query(`
UPDATE recipes SET
    title = '${title}',
    description = '${description}',
    cook_time_minutes = ${cook_time_minutes},
    difficulty = '${difficulty}',
    rating = ${rating},
    cuisine_id = '${cuisine_id}'
WHERE id = '${id}'
RETURNING *;`);
    console.log('Recipes updated successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a Recipes' + err);
  }
};

// DELETE a recipe
export const deleteRecipe = async (id: string): Promise<Recipes[]> => {
  try {
    const result = await pool.query(
      `DELETE FROM recipes WHERE id = '${id}' RETURNING *;`
    );
    console.log('Recipe deleted succesfully', result);
    return result;
  } catch (err) {
    throw new Error('Error deleting a Recipes' + err);
  }
};
