import { Request, Response } from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipePartial,
  deleteRecipe,
  getRecipeByQuery,
} from '../models/recipeModel';
import { getCuisineById } from '../models/cuisineModel';

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
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid recipe ID' });
      return;
    }

    const recipe = await getRecipeById(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

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

    const cuisines = await getCuisineById(cuisine_id);
    if (!cuisines) {
      res.status(400).json({
        error: 'cuisine_id does not match any existing cuisines',
        message: `Cuisine doesnt exist`,
      });
      return console.log('ID given doesnt match any of the cuisines');
    }

    const recipe = await createRecipe(
      title,
      description,
      cook_time_minutes,
      difficulty,
      rating,
      cuisine_id
    );

    res.status(201).json(recipe[0]);
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
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid recipe ID' });
      return;
    }

    const existingRecipe = await getRecipeById(id);
    if (!existingRecipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    const allowedKeys = [
      'title',
      'description',
      'cook_time_minutes',
      'difficulty',
      'rating',
      'cuisine_id',
    ];

    const updateData: any = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedKeys.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' });
      return;
    }
    if (updateData.cuisine_id !== undefined) {
      const cuisine = await getCuisineById(updateData.cuisine_id);
      if (!cuisine) {
        res.status(400).json({
          error: 'Resource not found',
          message: `Referenced resource with ID ${updateData.cuisine_id} does not exist`,
        });
        return;
      }
    }
    const updated = await updateRecipePartial(id, updateData);
    if (!updated || updated.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.status(200).json(updated[0]);
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
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'Invalid recipe ID' });
      return;
    }

    const recipe = await deleteRecipe(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to delete a recipe' + err });
  }
};

export const searchRecipesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const q = req.query.q;

    if (!q || typeof q !== 'string' || q.trim() === '') {
      res.status(400).json({ error: 'Search query is required' });
      return;
    }
    const recipes = await getRecipeByQuery(q.trim());
    res.status(200).json({ recipes });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong',
    });
  }
};
