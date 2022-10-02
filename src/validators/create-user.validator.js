import joi from 'joi';

export const createUserValidator = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'O nome não pode ser vazio',
    'any.required': 'O nome é obrigatório',
  }),
  email: joi.string().email().required().messages({
    'string.email': 'O e-mail deve ser válido',
    'string.empty': 'O e-mail não pode ser vazio',
    'any.required': 'O e-mail é obrigatório',
  }),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      'string.pattern.base': 'A senha deve conter no mínimo 6 caracteres e apenas letras e números',
      'string.empty': 'A senha não pode ser vazia',
      'any.required': 'A senha é obrigatória',
    }),
  role: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId Regex
    .required()
    .messages({
      'string.empty': 'O papel não pode ser vazio',
      'string.pattern.base': 'O papel deve ser um ObjectId válido',
      'any.required': 'O papel é obrigatório',
    }),
});
