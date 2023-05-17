import { Router } from 'express';
import ordersController from '../controllers/orders.controller';
import validateToken from '../middlewares/validateToken';

const ordersRoute = Router();

ordersRoute.get('/', ordersController.getAll);

ordersRoute.post('/', validateToken, ordersController.set);

export default ordersRoute;
