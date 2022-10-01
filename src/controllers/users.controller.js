import usersService from '../services/users.service.js';
import { handleError } from '../utils/handleError.js';

const createUser = async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(201).send(user);
  } catch (err) {
    handleError(err, res);
  }
};

export default {
  createUser,
};
