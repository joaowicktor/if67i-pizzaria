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

const createPost = async (currentUser, payload) => {
  const post = await Post.create({
    ...payload,
    image: 'https://picsum.photos/200/300', // TODO: change to real image url
    user: currentUser._id,
  });
  return post;
};

export default {
  listPosts,
  createPost,
};
