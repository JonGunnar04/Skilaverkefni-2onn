import { Router } from 'express';
import { getStatus, getDbStatus } from '../controllers/statusController';

const router = Router();

router.get('/status', getStatus);
router.get('/status/db', getDbStatus);

export default router;
