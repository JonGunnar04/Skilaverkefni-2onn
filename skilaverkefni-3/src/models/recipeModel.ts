import pool from '../config/db.js';

export interface Recipes {
  id: number;
  title: string;
  description: string;
  cook_time_minutes: number;
  difficulty: string;
  rating: number;
  created_at: string;
  cuisine_id: number;
  cuisine_name?: string;
}

// GET all recipes
export const getAllRecipes = async (): Promise<Recipes[]> => {
  try {
    const result = await pool.query(`
      SELECT r.*, c.name AS cuisine_name
      FROM recipes r
      JOIN cuisines c ON r.cuisine_id = c.id
      ORDER BY r.id;
    `);
    console.log('Recipes fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading all Recipes' + err);
  }
};

// GET recipe by id
export const getRecipeById = async (id: number): Promise<Recipes | null> => {
  try {
    const result = await pool.oneOrNone(
      `
      SELECT r.*, c.name AS cuisine_name
      FROM recipes r
      JOIN cuisines c ON r.cuisine_id = c.id
      WHERE r.id = $1;
      `,
      [id]
    );
    console.log('Recipe fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading Recipe by ID' + err);
  }
};

// POST create a new recipe
export const createRecipe = async (
  title: string,
  description: string,
  cook_time_minutes: number,
  difficulty: string,
  rating: number,
  cuisine_id: number
): Promise<Recipes[]> => {
  try {
    const result = await pool.query(
      `
      WITH inserted AS (
        INSERT INTO recipes (title, description, cook_time_minutes, difficulty, rating, cuisine_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      )
      SELECT inserted.*, c.name AS cuisine_name
      FROM inserted
      JOIN cuisines c ON inserted.cuisine_id = c.id;
      `,
      [title, description, cook_time_minutes, difficulty, rating, cuisine_id]
    );
    console.log('Recipes created successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error creating a Recipes' + err);
  }
};

// PUT update a recipe
export const updateRecipePartial = async (
  id: number,
  data: Partial<Omit<Recipes, 'id' | 'created_at' | 'cuisine_name'>>
): Promise<Recipes[]> => {
  try {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return [];
    }
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const values = keys.map((key) => (data as any)[key]);
    const result = await pool.query(
      `
      WITH updated AS (
        UPDATE recipes
        SET ${setClause}
        WHERE id = $1
        RETURNING *
      )
      SELECT updated.*, c.name AS cuisine_name
      FROM updated
      JOIN cuisines c ON updated.cuisine_id = c.id;
      `,
      [id, ...values]
    );
    console.log('Recipes updated successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a Recipes' + err);
  }
};

// DELETE a recipe
export const deleteRecipe = async (id: number): Promise<Recipes | null> => {
  try {
    const result = await pool.oneOrNone(
      `DELETE FROM recipes WHERE id = $1 RETURNING *;`,
      [id]
    );
    console.log('Recipe deleted succesfully', result);
    return result;
  } catch (err) {
    throw new Error('Error deleting a Recipes' + err);
  }
};

// GET recipe by query
export const getRecipeByQuery = async (q: string): Promise<Recipes[]> => {
  try {
    const result = await pool.query(
      `
      SELECT r.*, c.name AS cuisine_name
      FROM recipes r
      JOIN cuisines c ON r.cuisine_id = c.id
      WHERE r.title ILIKE $1
      ORDER BY r.id;
      `,
      [`%${q}%`]
    );
    console.log('Recipes fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading recipe by query ' + err);
  }
};
