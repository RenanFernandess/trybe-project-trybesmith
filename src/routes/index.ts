import { Router } from 'express';
import ordersRoute from './orders.route';
import productsRoute from './products.route';
import usersRoute from './users.route';
import loginRoute from './login.routes';

const routes = Router();

routes.use('/products', productsRoute);
routes.use('/users', usersRoute);
routes.use('/orders', ordersRoute);
routes.use('/login', loginRoute);

export default routes;
