import jsonHelper from '../helpers/json.helper.js';
import postsService from '../services/posts.service.js';

const list = async (req, res, next) => {
  const filter = jsonHelper.tryParse(req.query?.filter);

  try {
    const posts = await postsService.listPosts({ filter });
    res.send(posts);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const post = await postsService.createPost(req.user, req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  create,
};
