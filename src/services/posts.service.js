import { supabase } from '../external-services/supabase.service.js';
import { Post } from '../models/post.model.js';

const listPosts = async ({ filter }) => {
  const query = Post.find().populate('user', 'name');

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

  const posts = await query.sort({ createdAt: 'DESC' });
  return posts;
};

const createPost = async (currentUser, payload, imageFile) => {
  const uploadedFile = await supabase.storage.from('posts').upload(imageFile.filename, imageFile.buffer);
  const post = await Post.create({
    ...payload,
    image: `${process.env.SUPABASE_STORAGE_URL}${uploadedFile.data.Key}`,
    user: currentUser._id,
  });
  return post;
};

const likePost = async (postId) => {
  const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
  return post;
}

export default {
  listPosts,
  createPost,
  likePost,
};
