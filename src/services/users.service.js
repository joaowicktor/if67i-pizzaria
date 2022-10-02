import { User } from '../models/user.model.js';
import { Exception } from '../utils/exception.js';

const listUsers = async () => {
  const users = await User.find().populate('role', 'name');
  return users;
}

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

const updateSelfData = async (currentUser, payload) => {
  await User.findByIdAndUpdate(currentUser.id, payload);
  return;
};

export default {
  listUsers,
  createUser,
  updateSelfData,
};
