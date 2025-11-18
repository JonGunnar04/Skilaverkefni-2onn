import express from 'express';
import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} from '../controllers/recipeController';
import { validate } from '../middleware/validate';
import { createRecipeRequest } from '../schemas/recipeSchema';

const router = express.Router();

router.get('/', getAllRecipesController);
router.get('/:id', getRecipeByIdController);
router.post('/', validate(createRecipeRequest), createRecipeController);
router.put('/:id', updateRecipeController);
router.delete('/:id', deleteRecipeController);

export default router;
