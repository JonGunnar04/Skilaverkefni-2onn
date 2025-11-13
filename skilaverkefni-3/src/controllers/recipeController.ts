import { Request, Response } from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../models/recipeModel';

export const getAllRecipesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch Recipes' + err });
  }
};

export const getRecipeByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const recipe = await getRecipeById(id);
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch Recipe by ID' + err });
  }
};

export const createRecipeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      cook_time_minutes,
      difficulty,
      rating,
      cuisine_id,
    } = req.body;
    const recipe = await createRecipe(
      title,
      description,
      cook_time_minutes,
      difficulty,
      rating,
      cuisine_id
    );
    res.status(201).json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to create a Recipe' + err });
  }
};

export const updateRecipeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      title,
      description,
      cook_time_minutes,
      difficulty,
      rating,
      cuisine_id,
    } = req.body;
    const recipeUpdate = await updateRecipe(
      id,
      title,
      description,
      cook_time_minutes,
      difficulty,
      rating,
      cuisine_id
    );
    res.status(200).json(recipeUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to update Recipe' + err });
  }
};

export const deleteRecipeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const recipe = await deleteRecipe(id);
    res.status(204).json(recipe);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to delete a recipe' + err });
  }
};
