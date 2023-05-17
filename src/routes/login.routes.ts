import { Router } from 'express';
import usersController from '../controllers/users.controller';

const loginRoute = Router();

loginRoute.post('/', usersController.login);

export default loginRoute;
