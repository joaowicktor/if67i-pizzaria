import { supabase } from '../external-services/supabase.service.js';
import { Pizza } from '../models/pizza.model.js';
import { Comment } from '../models/comment.model.js';
import mongoose from 'mongoose';
import { Exception } from '../utils/exception.js';

const listPizzas = async ({ filter }) => {
  const query = Pizza.find().populate('user', 'name').populate('comments', 'content');

  if (filter) {
    Object.keys(filter).forEach((key) => {
      const value = filter[key];
      switch (key) {
        case 'maxPrice':
          if (typeof value === 'number') {
            query.find({ price: { $lte: value } });
          }
          break;
        case 'ingredients':
          if (Array.isArray(value) && value.length > 0) {
            query.find({ ingredients: { $in: value } });
          }
          break;
        default:
          break;
      }
    });
  }

  const pizzas = await query.sort({ createdAt: 'DESC' });
  return pizzas;
};

const createPizza = async (currentUser, payload, imageFile) => {
  const uploadedFile = await supabase.storage.from('pizzas').upload(imageFile.filename, imageFile.buffer);
  const pizza = await Pizza.create({
    ...payload,
    image: `${process.env.SUPABASE_STORAGE_URL}/${uploadedFile.data.Key}`,
    user: currentUser._id,
  });
  return pizza;
};

const likePizza = async (pizzaId) => {
  const pizza = await Pizza.findByIdAndUpdate(pizzaId, { $inc: { likes: 1 } }, { new: true });

  if (!pizza) {
    throw new Exception({ message: 'Pizza não encontrada', status: 404 });
  }
  
  return pizza;
};

const listPizzaComments = async (pizzaId) => {
  const comments = await Comment.find({ pizzaId });
  return comments;
}

const commentOnPizza = async (pizzaId, content) => {
  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();

    const [comment] = await Comment.create([{ content, pizzaId }], { session });
    await Pizza.findByIdAndUpdate(pizzaId, { $push: { comments: comment._id } }, { session });

    await session.commitTransaction();

    return comment;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  listPizzas,
  createPizza,
  likePizza,
  listPizzaComments,
  commentOnPizza,
};
