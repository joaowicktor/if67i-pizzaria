import jwtHelper from '../helpers/jwt.helper.js';
import User from '../models/user.model.js';
import { Exception } from '../utils/exception.js';

const login = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email }, '+password').populate('role');
  if (!user) {
    throw new Exception({
      message: 'Usuário não encontrado',
      status: 404,
    });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Exception({
      message: 'E-mail e/ou senha inválidos',
      status: 401,
    });
  }

  const token = await jwtHelper.generateToken(user.id, { role: user.role.key });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export default {
  login,
};
