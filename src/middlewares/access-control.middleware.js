import jwt from 'jsonwebtoken';
import jwtHelper from '../helpers/jwt.helper.js';
import { User } from '../models/user.model.js';
import { Exception } from '../utils/exception.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Exception({
        message: 'Token não informado',
        status: 401,
      });
    }

    const [, token] = authHeader.split(' ');

    const decoded = await jwtHelper.verifyToken(token);
    const user = await User.findById(decoded.sub).populate({
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
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (permission) => (req, res, next) => {
  try {
    const { user } = req;

    if (!user.role.permissions.some((p) => p.key === permission)) {
      throw new Exception({
        message: 'Você não tem permissão para acessar este recurso',
        status: 403,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  authenticate,
  authorize,
};
