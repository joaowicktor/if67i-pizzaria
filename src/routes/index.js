import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import usersRoutes from '../routes/users.routes.js';
import pizzasRoutes from '../routes/pizzas.routes.js';
import rolesRoutes from '../routes/roles.routes.js';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/pizzas', pizzasRoutes);
routes.use('/roles', rolesRoutes);

export default routes;
