import express from 'express';
import cuisineRoutes from './routes/cuisineRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/api/cuisines', cuisineRoutes);
app.use('/api/recipes', recipeRoutes);

app.use(errorHandler);

export default app;
