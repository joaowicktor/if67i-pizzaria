import usersService from '../services/users.service.js';

const list = async (req, res, next) => {
  try {
    const users = await usersService.listUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    await usersService.updateUser(req.params.id, req.body);
    res.send();
  } catch (err) {
    next(err);
  }
};

const updateSelfData = async (req, res, next) => {
  try {
    await usersService.updateSelfData(req.user, req.body);
    res.send();
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    res.send();
  } catch (err) {
    next(err);
  }
}

export default {
  list,
  createUser,
  update,
  updateSelfData,
  deleteUser,
};
