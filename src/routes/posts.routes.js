import express from 'express';
import postsController from '../controllers/posts.controller.js';
import { Permission } from '../enums/permissions.enum.js';
import ac from '../middlewares/access-control.middleware.js';
import validator from '../validators/index.js';
import { createPostValidator } from '../validators/create-post.validator.js';
import { listPostFilterValidator } from '../validators/list-post-filter.validator.js';

const router = express.Router();

router.get('/', validator.query(listPostFilterValidator), postsController.list);
router.post('/', ac.authenticate, ac.authorize(Permission.CREATE_POST), validator.body(createPostValidator), postsController.create);

export default router;
