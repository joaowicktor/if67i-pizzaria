import { handleError } from '../utils/handleError.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    handleError(err, res);
  }
};
