import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import usersRoutes from '../routes/users.routes.js';
import postsRoutes from '../routes/posts.routes.js';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);
routes.use('/posts', postsRoutes);

export default routes;
