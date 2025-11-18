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

export const getCuisineById = async (id: string): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(`SELECT * FROM cuisines WHERE id = ${id}`);
    console.log('Recipes fetched from database:', result);
    return result;
  } catch (err) {
    throw new Error('Error loading cuisine by ID' + err);
  }
};

// GET recipes by cuisines
export const getRecipesByCuisines = async (id: string): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `SELECT * FROM recipes WHERE cuisine_id = ${id};`
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
      `INSERT INTO cuisines (name) VALUES('${name}') RETURNING *`
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
  id: string
): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `UPDATE cuisines SET name = '${name}' WHERE id = '${id}' RETURNING *;`
    );
    console.log('Updated a Cuisine successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a cuisine' + err);
  }
};

// DELETE a cuisine
export const deleteCuisine = async (id: string): Promise<Cuisine[]> => {
  try {
    const result = await pool.query(
      `DELETE FROM cuisines WHERE id = '${id}' RETURNING *;`
    );
    console.log('Deleted a Cuisine successfully:', result);
    return result;
  } catch (err) {
    throw new Error('Error updating a cuisine' + err);
  }
};
