import { Schema, model } from 'mongoose';
import { Comment } from './comment.model.js';
import { User } from './user.model.js';

const PizzaSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: User },
    comments: [{ type: Schema.Types.ObjectId, ref: Comment }],
    likes: { type: Number, default: 0 },
  },
  { collection: 'pizzas', timestamps: true }
);

export const Pizza = model('Pizza', PizzaSchema);
