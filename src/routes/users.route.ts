import { Router } from 'express';
import usersController from '../controllers/users.controller';

const usersRoute = Router();

usersRoute.post('/', usersController.set);

export default usersRoute;