import express from 'express';
import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
} from '../controllers/recipeController';

const router = express.Router();

router.get('/', getAllRecipesController);
router.get('/:id', getRecipeByIdController);
router.post('/', createRecipeController);
router.put('/:id', updateRecipeController);
router.delete('/:id', deleteRecipeController);

export default router;
