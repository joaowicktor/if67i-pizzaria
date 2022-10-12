import jsonHelper from '../helpers/json.helper.js';
import pizzasService from '../services/pizzas.service.js';

const list = async (req, res, next) => {
  const filter = jsonHelper.tryParse(req.query?.filter);

  try {
    const pizzas = await pizzasService.listPizzas({ filter });
    res.send(pizzas);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { data } = req.body;
  try {
    const pizza = await pizzasService.createPizza(req.user, data, req.file);
    res.status(201).json(pizza);
  } catch (error) {
    next(error);
  }
};

const like = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pizza = await pizzasService.likePizza(id);
    res.json(pizza);
  } catch (error) {
    next(error);
  }
};

const listComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await pizzasService.listPizzaComments(id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const comment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const pizza = await pizzasService.commentOnPizza(id, content);
    res.json(pizza);
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  create,
  like,
  listComments,
  comment,
};
