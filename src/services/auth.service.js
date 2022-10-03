import jwtHelper from '../helpers/jwt.helper.js';
import { User } from '../models/user.model.js';
import { Exception } from '../utils/exception.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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

  const refreshToken = await generateRefreshToken(user.id);
  const accessToken = await generateAccessToken(user.id, { role: user.role.key });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    refreshToken,
    accessToken,
  };
};

const generateAccessToken = async (userId, payload) => {
  return jwtHelper.generateToken(payload, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    subject: userId,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  });
};

const generateRefreshToken = async (userId) => {
  const token = await jwtHelper.generateToken(null, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    subject: userId,
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  });

  const sha256Hash = crypto.createHash('sha256').update(token).digest('hex');
  const hashedToken = await bcrypt.hash(sha256Hash, 10);
  await User.findByIdAndUpdate(userId, { currentRefreshToken: hashedToken });

  return token;
};

const refreshAccessToken = async (user) => {
  const accessToken = await generateAccessToken(user.id, { role: user.role.key });
  return { accessToken };
};

export default {
  login,
  refreshAccessToken,
};
