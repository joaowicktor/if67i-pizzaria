import express from 'express';
import ordersController from '../controllers/orders.controller.js';
import { createOrderBodyValidator } from '../validators/create-order.validator.js';
import validators from '../validators/index.js';
const router = express.Router();

router.post('/', validators.body(createOrderBodyValidator), ordersController.create);
export default router;