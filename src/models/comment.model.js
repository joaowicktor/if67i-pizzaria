import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    pizzaId: { type: Schema.Types.ObjectId, ref: 'Pizza' },
  },
  { collection: 'comments', timestamps: true }
);

export const Comment = model('Comment', CommentSchema);
