import express from 'express';
import { registerController } from '../controllers/authController';
import { validate } from '../middleware/validate';
import { registerSchema } from '../schemas/authSchema';

const router = express.Router();

router.post('/register', validate(registerSchema), registerController);

export default router;
