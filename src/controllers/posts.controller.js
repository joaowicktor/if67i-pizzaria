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
  const { data } = req.body;
  try {
    const post = await postsService.createPost(req.user, data, req.file);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const like = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await postsService.likePost(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  create,
  like,
};
