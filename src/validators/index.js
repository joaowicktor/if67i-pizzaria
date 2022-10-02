import jsonHelper from '../helpers/json.helper.js';

/**
 * Validate the request query params based on the given Joi schema
 * @param {object} schema - Joi schema
 * @returns {function} next
 */
const query = (schema) => async (req, res, next) => {
  try {
    const queryObject = Object.keys(req.query).reduce((acc, key) => {
      acc[key] = jsonHelper.tryParse(req.query[key]);
      return acc;
    }, {});

    await schema.validateAsync(queryObject);
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Validate the request body based on the given Joi schema
 * @param {import('joi').Schema} schema
 * @returns {function} next
 */
const body = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Verify if file exists in request object
 * @returns {function} next
 */
const file = () => async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('Arquivo não encontrado');
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  query,
  body,
  file,
};
