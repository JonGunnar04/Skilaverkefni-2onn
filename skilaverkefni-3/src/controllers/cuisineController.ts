import { Request, Response } from 'express';
import {
  getAllCuisines,
  getRecipesByCuisines,
  createCuisine,
  updateCuisine,
  deleteCuisine,
  getCuisineById,
} from '../models/cuisineModel';

export const getAllCuisinesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cuisines = await getAllCuisines();
    res.status(200).json(cuisines);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch cuisines' + err });
  }
};

export const getCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }

    const cuisine = await getCuisineById(id);
    if (!cuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }

    res.status(200).json(cuisine);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch cuisine' + err });
  }
};

export const getRecipesByCuisinesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }

    const cuisine = await getCuisineById(id);
    if (!cuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }

    const recipes = await getRecipesByCuisines(id);
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: 'Failed to fetch recipes by cuisine ' + err });
  }
};

export const createCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const cuisines = await getAllCuisines();
    const cuisine = cuisines.find((cuisine) => {
      return cuisine.name === name;
    });
    if (cuisine) {
      res.status(400).json({
        error: 'Cuisine already exists',
        message: `Cuisine with name '${name}' already exists`,
      });
      return;
    }
    const createCuisines = await createCuisine(name);
    res.status(201).json(createCuisines);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to create a Cuisine' + err });
  }
};

export const updateCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }

    const existingCuisine = await getCuisineById(id);
    if (!existingCuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }
    const updated = await updateCuisine(name, id);
    if (!updated || updated.length === 0) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }
    res.status(200).json(updated[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to update a Cuisine' + err });
  }
};

export const deleteCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid cuisine ID' });
      return;
    }
    const cuisine = await deleteCuisine(id);
    if (!cuisine) {
      res.status(404).json({ error: 'Cuisine not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to delete a Cuisine' + err });
  }
};
