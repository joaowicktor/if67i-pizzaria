import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import usersRoutes from '../routes/users.routes.js';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);

export default routes;
