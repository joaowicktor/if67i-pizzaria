import User from '../models/User.js';
import { Exception } from '../utils/exception.js';

const createUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Exception({
      status: 409,
      message: 'User already exists',
    });
  }
  const user = await User.create(payload);
  return user;
};

export default {
  createUser,
};
