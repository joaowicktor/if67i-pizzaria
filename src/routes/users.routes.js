import express from 'express';
import usersController from '../controllers/users.controller.js';
import { createUserValidator } from '../validators/create-user.validator.js';
import { validate } from '../validators/index.js';

const router = express.Router();

router.post('/', validate(createUserValidator), usersController.createUser);

export default router;