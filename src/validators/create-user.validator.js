import joi from 'joi';

export const createUserValidator = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required(),
});
