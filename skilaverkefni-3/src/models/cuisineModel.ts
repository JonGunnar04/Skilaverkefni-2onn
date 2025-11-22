import pool from '../config/db.js';

export interface Cuisine {
  name: string;
}

// GET all cuisines
export const getAllCuisines = async (): Promise<Cuisine[]> => {
  try {
    const result = await pool.query('SELECT * FROM cuisines');
    console.log('Cuisines fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading all cuisines' + err);
  }
};

// GET cuisine by ID
export const getCuisineById = async (id: number): Promise<Cuisine | null> => {
  try {
    const result = await pool.oneOrNone(
      `SELECT * FROM cuisines WHERE id = $1;`,
      [id]
    );
    console.log('Cuisine fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading cuisine by ID' + err);
  }
};

// GET recipes by cuisines
export const getRecipesByCuisines = async (id: number): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `
      SELECT r.*, c.name AS cuisine_name
      FROM recipes r
      JOIN cuisines c ON r.cuisine_id = c.id
      WHERE r.cuisine_id = $1
      ORDER BY r.id;
      `,
      [id]
    );

    if (!result) {
      console.log('no result wsas found');
    }
    console.log('Recipes by Cuisines fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading recipes by cuisine' + err);
  }
};

// POST create a new cuisine
export const createCuisine = async (name: string): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `INSERT INTO cuisines (name) VALUES($1) RETURNING *`,
      [name]
    );
    console.log('Created a Cuisine successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error inserting into cuisines ' + err);
  }
};

// PUT update a cuisine
export const updateCuisine = async (
  name: string,
  id: number
): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `UPDATE cuisines SET name = $1 WHERE id = $2 RETURNING *;`,
      [name, id]
    );
    console.log('Updated a Cuisine successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a cuisine' + err);
  }
};

// DELETE a cuisine
export const deleteCuisine = async (id: number): Promise<Cuisine | null> => {
  try {
    const result = await pool.oneOrNone(
      `DELETE FROM cuisines WHERE id = $1 RETURNING *;`,
      [id]
    );
    console.log('Deleted a Cuisine successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a cuisine' + err);
  }
};
