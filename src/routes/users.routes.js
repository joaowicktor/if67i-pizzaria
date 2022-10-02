import express from 'express';
import usersController from '../controllers/users.controller.js';
import { Permission } from '../enums/permissions.enum.js';
import ac from '../middlewares/access-control.middleware.js';
import { createUserValidator } from '../validators/create-user.validator.js';
import validator from '../validators/index.js';

const router = express.Router();

router.post('/', ac.auth(Permission.CREATE_USER), validator.body(createUserValidator), usersController.createUser);

export default router;
