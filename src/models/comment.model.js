import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { collection: 'comments', timestamps: true }
);

export const Comment = model('Comment', CommentSchema);
