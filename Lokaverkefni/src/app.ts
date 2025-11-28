import express from 'express';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

// All API routes go under /api
app.use('/api', router);

// Error handler (must be last)
app.use(errorHandler);

export default app;
