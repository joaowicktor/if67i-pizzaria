import joi from 'joi';

export const updateSelfDataValidator = joi
  .object({
    name: joi.string().optional().messages({
      'string.empty': 'O nome não pode ser vazio',
    }),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9]{6,}$/)
      .optional()
      .messages({
        'string.pattern.base': 'A senha deve conter no mínimo 6 caracteres e apenas letras e números',
        'string.empty': 'A senha não pode ser vazia',
        'any.required': 'A senha é obrigatória',
      }),
  })
  .min(1)
  .messages({
    'object.min': 'É necessário informar ao menos um campo para atualizar',
    'object.unknown': 'O campo {{#label}} não é permitido',
  });
