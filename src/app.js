import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.router.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', productsRouter);
app.use(userRoutes);

export default app;
