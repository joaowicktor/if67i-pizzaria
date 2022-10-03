import authService from '../services/auth.service.js';

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    return res.status(200).send(data);
  } catch (error) {
    return next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const data = await authService.refreshAccessToken(req.user);
    return res.status(200).send(data);
  } catch (error) {
    return next(error);
  }
};

export default {
  login,
  refreshAccessToken,
};
