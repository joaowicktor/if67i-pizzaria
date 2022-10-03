import jwt from 'jsonwebtoken';
import cryptoHelper from '../helpers/crypto.helper.js';
import jwtHelper from '../helpers/jwt.helper.js';
import { User } from '../models/user.model.js';
import { Exception } from '../utils/exception.js';

const authenticate = async (authHeader) => {
  if (!authHeader) {
    throw new Exception({
      message: 'Token não informado',
      status: 401,
    });
  }

  const [, token] = authHeader.split(' ');

  const { sub: userId } = await jwtHelper.verifyToken(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  const user = await User.findById(userId).populate({
    path: 'role',
    populate: {
      path: 'permissions',
    },
  });

  if (!user) {
    throw new Exception({
      message: 'Usuário não encontrado',
      status: 404,
    });
  }

  user.password = undefined;
  return user;
};

const authorize = (user, permission) => {
  if (!user.role.permissions.some((p) => p.key === permission)) {
    throw new Exception({
      message: 'Você não tem permissão para acessar este recurso',
      status: 403,
    });
  }
};

const auth = (permission) => async (req, res, next) => {
  try {
    const user = await authenticate(req.headers.authorization);

    if (permission) {
      authorize(user, permission);
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const authWithRefreshToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Exception({
        message: 'Token não informado',
        status: 401,
      });
    }

    const [, refreshToken] = authorizationHeader.split(' ');

    const { sub: userId } = await jwtHelper.verifyToken(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
    const user = await User.findById(userId, '+currentRefreshToken').populate('role');

    if (!user) {
      throw new Exception({
        message: 'Usuário não encontrado',
        status: 404,
      });
    }

    const isRefreshTokenMatching = await cryptoHelper.compareSHA256Hash(refreshToken, user.currentRefreshToken);

    if (!isRefreshTokenMatching) {
      throw new Exception({
        message: 'Token inválido',
        status: 401,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  auth,
  authWithRefreshToken,
};
