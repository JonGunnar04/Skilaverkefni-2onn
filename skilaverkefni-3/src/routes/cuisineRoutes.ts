import express from 'express';
import {
  getAllCuisinesController,
  getRecipesByCuisinesController,
  createCuisineController,
  updateCuisineController,
  deleteCuisineController,
  getCuisineController,
} from '../controllers/cuisineController';
import { validate } from '../middleware/validate';
import { createCuisineRequest } from '../schemas/cuisineSchema';

const router = express.Router();

router.get('/', getAllCuisinesController);
router.get('/:id/recipes', getRecipesByCuisinesController);
router.get('/:id', getCuisineController);
router.post('/', validate(createCuisineRequest), createCuisineController);
router.put('/:id', updateCuisineController);
router.delete('/:id', deleteCuisineController);

export default router;
