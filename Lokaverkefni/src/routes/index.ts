import { Router } from 'express';
import statusRoutes from './statusRoutes';

const router = Router();

router.use('/', statusRoutes);

export default router;
