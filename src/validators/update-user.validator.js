import joi from 'joi';

export const updateUserValidator = joi
  .object({
    name: joi.string().optional().messages({
      'string.empty': 'O nome não pode ser vazio',
    }),
    email: joi.string().email().optional().messages({
      'string.email': 'O email deve ser válido',
      'string.empty': 'O email não pode ser vazio',
    }),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{6,}$/)
      .optional()
      .messages({
        'string.pattern.base': 'A senha deve conter no mínimo 6 caracteres e apenas letras e números',
        'string.empty': 'A senha não pode ser vazia',
      }),
    role: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId Regex
      .optional()
      .messages({
        'string.empty': 'O papel não pode ser vazio',
        'string.pattern.base': 'O papel deve ser um ObjectId válido',
      }),
  })
  .min(1)
  .messages({
    'object.min': 'É necessário informar ao menos um campo para atualizar',
    'object.unknown': 'O campo {{#label}} não é permitido',
  });

export const updateUserParamsValidator = joi.object({
  id: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId Regex
    .required()
    .messages({
      'string.empty': 'O id não pode ser vazio',
      'string.pattern.base': 'O id deve ser um ObjectId válido',
      'any.required': 'O id é obrigatório',
    }),
});
