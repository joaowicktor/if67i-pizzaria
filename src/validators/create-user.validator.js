import joi from 'joi';

export const createUserValidator = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
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
