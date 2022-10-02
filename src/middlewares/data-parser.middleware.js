import jsonHelper from '../helpers/json.helper.js';

const parseMultipartFormDataToObject = (req, res, next) => {
  const isMultipartFormData = req.headers['content-type']?.includes('multipart/form-data');

  if (isMultipartFormData) {
    const bodyObject = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = jsonHelper.tryParse(req.body[key]);
      return acc;
    }, {});

    req.body = bodyObject;
  }

  next();
};

export default {
  parseMultipartFormDataToObject,
};
