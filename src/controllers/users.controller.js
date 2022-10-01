import usersService from '../services/users.service.js';

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

export default {
  createUser,
};
