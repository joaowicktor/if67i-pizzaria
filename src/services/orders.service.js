import { Order } from '../models/order.model.js';

const createOrder = async (payload) => {
  return Order.create(payload);
};

const getOrdersStatistics = async () => {
  const orderAggregateQuery = Order.aggregate([
    {
      $group: {
        _id: '$pizza',
        total: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'pizzas',
        localField: '_id',
        foreignField: '_id',
        as: 'pizza',
      },
    },
    { $unwind: '$pizza' },
    {
      $project: {
        pizza: '$pizza.name',
        total: true,
      },
    },
  ]);

  const [totalOrders, totalPerPizza] = await Promise.all([Order.countDocuments(), orderAggregateQuery]);

  return {
    totalOrders,
    totalPerPizza,
  };
};

const getMostOrderedPizza = async () => {
  const [pizza] = await Order.aggregate([
    {
      $group: {
        _id: '$pizza',
        total: { $sum: '$quantity' },
      },
    },
    { $sort: { total: -1 } },
    {
      $lookup: {
        from: 'pizzas',
        localField: '_id',
        foreignField: '_id',
        as: 'pizza',
      },
    },
    { $unwind: '$pizza' },
    {
      $project: {
        name: '$pizza.name',
        totalOrdered: '$total',
      },
    },
    { $limit: 1 },
  ]);

  return pizza;
};

export default {
  createOrder,
  getOrdersStatistics,
  getMostOrderedPizza,
};
