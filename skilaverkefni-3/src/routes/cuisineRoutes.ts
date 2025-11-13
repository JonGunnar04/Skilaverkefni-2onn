import express from 'express';
import {
  getAllCuisinesController,
  getRecipesByCuisinesController,
  createCuisineController,
  updateCuisineController,
  deleteCuisineController,
} from '../controllers/cuisineController';

const router = express.Router();

router.get('/', getAllCuisinesController);
router.get('/:id/recipes', getRecipesByCuisinesController);
router.post('/', createCuisineController);
router.put('/:id', updateCuisineController);
router.delete('/:id', deleteCuisineController);

export default router;
