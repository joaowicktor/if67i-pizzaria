import express from 'express';
import usersController from '../controllers/users.controller.js';
import { Permission } from '../enums/permissions.enum.js';
import ac from '../middlewares/access-control.middleware.js';
import { createUserValidator } from '../validators/create-user.validator.js';
import validator from '../validators/index.js';
import { updateSelfDataValidator } from '../validators/update-self-data.validator.js';
import { updateUserValidator } from '../validators/update-user.validator.js';

const router = express.Router();

router.get('/', ac.auth(Permission.READ_USER), usersController.list);
router.post('/', ac.auth(Permission.CREATE_USER), validator.body(createUserValidator), usersController.createUser);
router.put('/:id', ac.auth(Permission.EDIT_USER), validator.params(updateUserParamsValidator), validator.body(updateUserValidator), usersController.update);
router.patch('/me', ac.auth(), validator.body(updateSelfDataValidator), usersController.updateSelfData);

export default router;
