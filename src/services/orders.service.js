import { Order } from '../models/order.model.js';

const createOrder = async (payload) => {
  return Order.create(payload);
};

export default {
  createOrder,
};
