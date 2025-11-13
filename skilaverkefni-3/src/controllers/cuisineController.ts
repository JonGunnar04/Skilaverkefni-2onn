import { Request, Response } from 'express';
import {
  getAllCuisines,
  getRecipesByCuisines,
  createCuisine,
  updateCuisine,
  deleteCuisine,
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

export const getRecipesByCuisinesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const cuisines = await getRecipesByCuisines(id);
    res.status(200).json(cuisines);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch recipes by cuisine' + err });
  }
};

export const createCuisineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const cuisines = await createCuisine(name);
    res.status(201).json(cuisines);
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
    const { name, id } = req.body;
    const cuisines = await updateCuisine(name, id);
    res.status(200).json(cuisines);
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
    const { id } = req.params as { id: string };
    const cuisines = await deleteCuisine(id);
    res.status(204).json(cuisines);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to delete a Cuisine' + err });
  }
};
