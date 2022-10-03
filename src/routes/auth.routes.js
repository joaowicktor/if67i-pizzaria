import express from 'express';
import authController from '../controllers/auth.controller.js';
import ac from '../middlewares/access-control.middleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh-token', ac.authWithRefreshToken, authController.refreshAccessToken);

export default router;
