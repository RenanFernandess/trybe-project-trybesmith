import { Router } from 'express';
import productsController from '../controllers/products.controller';

const productsRoute = Router();

productsRoute.post('/', productsController.set);

export default productsRoute;