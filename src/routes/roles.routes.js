import express from 'express';
import rolesController from '../controllers/roles.controller.js';
import { Permission } from '../enums/permissions.enum.js';
import ac from '../middlewares/access-control.middleware.js';
import { createRoleBodyValidator } from '../validators/create-role.validator.js';
import { deleteRoleParamsValidator } from '../validators/delete-role.validator.js';
import validators from '../validators/index.js';
import { updateRoleBodyValidator, updateRoleParamsValidator } from '../validators/update-role.validator.js';

const router = express.Router();

router.get('/', ac.auth(Permission.READ_ROLE), rolesController.list);
router.post('/', ac.auth(Permission.CREATE_ROLE), validators.body(createRoleBodyValidator), rolesController.create);
router.put(
  '/:id',
  ac.auth(Permission.EDIT_ROLE),
  validators.params(updateRoleParamsValidator),
  validators.body(updateRoleBodyValidator),
  rolesController.update
);
router.delete('/:id', ac.auth(Permission.DELETE_ROLE), validators.params(deleteRoleParamsValidator), rolesController.remove);

export default router;
