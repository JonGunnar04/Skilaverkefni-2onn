import { Router } from 'express';
import statusRoutes from './statusRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/', statusRoutes);
router.use('/auth', authRoutes);

export default router;
