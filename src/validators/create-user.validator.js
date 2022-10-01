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
});
