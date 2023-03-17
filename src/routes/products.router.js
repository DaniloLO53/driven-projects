import express from 'express';
import { setProducts } from '../controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.post('/', setProducts);

export default productsRouter;
