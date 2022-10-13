import ordersService from '../services/orders.service.js';

const create = async (req, res, next) => {
  try {
    const order = await ordersService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
