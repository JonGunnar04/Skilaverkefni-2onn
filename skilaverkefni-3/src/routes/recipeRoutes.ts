import express from 'express';
import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
  searchRecipesController,
} from '../controllers/recipeController';
import { validate } from '../middleware/validate';
import { createRecipeRequest } from '../schemas/recipeSchema';

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.query.q) return searchRecipesController(req, res);
  return getAllRecipesController(req, res);
});
router.get('/:id', getRecipeByIdController);
router.post('/', validate(createRecipeRequest), createRecipeController);
router.put('/:id', updateRecipeController);
router.delete('/:id', deleteRecipeController);

export default router;
