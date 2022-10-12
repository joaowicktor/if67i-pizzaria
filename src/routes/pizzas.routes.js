import express from 'express';
import pizzasController from '../controllers/pizzas.controller.js';
import { Permission } from '../enums/permissions.enum.js';
import ac from '../middlewares/access-control.middleware.js';
import validator from '../validators/index.js';
import { createPizzaValidator } from '../validators/create-pizza.validator.js';
import { listPizzaFilterValidator } from '../validators/list-pizza-filter.validator.js';
import { upload } from '../middlewares/file-upload.middleware.js';
import dataParserMiddleware from '../middlewares/data-parser.middleware.js';
import { likePizzaParamsValidator } from '../validators/like-pizza.validator.js';
import { commentPizzaBodyValidator, commentPizzaParamsValidator } from '../validators/comment-pizza.validator.js';

const router = express.Router();

router.get('/', validator.query(listPizzaFilterValidator), pizzasController.list);
router.post(
  '/',
  ac.auth(Permission.CREATE_POST),
  upload().single('image'),
  validator.file(),
  dataParserMiddleware.parseMultipartFormDataToObject,
  validator.body(createPizzaValidator),
  pizzasController.create
);
router.patch('/:id/like', validator.params(likePizzaParamsValidator), pizzasController.like);
router.get('/:id/comments', validator.params(commentPizzaParamsValidator), pizzasController.listComments);
router.post('/:id/comment', validator.params(commentPizzaParamsValidator), validator.body(commentPizzaBodyValidator), pizzasController.comment);

export default router;
