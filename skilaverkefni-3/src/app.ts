import express from 'express';
import cuisineRoutes from './routes/cuisineRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/cuisines', cuisineRoutes);
app.use('/api/recipes', recipeRoutes);

export default app;
