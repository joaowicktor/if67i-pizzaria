import { User } from '../models/user.model.js';
import { Exception } from '../utils/exception.js';

const listUsers = async () => {
  const users = await User.find().populate('role', 'name');
  return users;
};

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

const updateUser = async (id, payload) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Exception({
      status: 404,
      message: 'Usuário não encontrado',
    });
  }

  await user.updateOne(payload);

  return;
};

const updateSelfData = async (currentUser, payload) => {
  await User.findByIdAndUpdate(currentUser.id, payload);
  return;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return;
};

export default {
  listUsers,
  createUser,
  updateUser,
  updateSelfData,
  deleteUser,
};
