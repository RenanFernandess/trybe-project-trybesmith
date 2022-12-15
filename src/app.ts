import express from 'express';
import ordersRoute from './routes/orders.route';
import productsRoute from './routes/products.route';
import usersRoute from './routes/users.route';

const app: express.Application = express();

app.use(express.json());

app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);

export default app;
