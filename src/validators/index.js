import jsonHelper from '../helpers/json.helper.js';

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

const body = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  query,
  body,
};
