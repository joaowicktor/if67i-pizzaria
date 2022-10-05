import joi from 'joi';

export const updateRoleBodyValidator = joi
  .object({
    name: joi.string().optional().messages({
      'string.empty': 'O nome não pode ser vazio',
    }),
    key: joi
      .string()
      .regex(/[A-Z0-9]+(?:_[A-Z0-9]+)*/)
      .optional()
      .messages({
        'string.empty': 'A chave do papel não pode ser vazia',
        'string.pattern.base': 'A chave do papel deve ser apenas letras maiúsculas e/ou dígitos e separada por _',
        'string.base': 'A chave do papel deve ser uma string',
      }),
    permissions: joi
      .array()
      .min(1)
      .items(joi.string().regex(/[a-z]+:[a-z]+/))
      .optional()
      .messages({
        'array.base': 'As permissões devem ser uma lista',
        'array.min': 'Deve haver pelo menos uma permissão',
        'string.empty': 'As permissões não podem ser vazias',
        'string.pattern.base': 'As permissões devem ser no formato <action>:<resource>',
        'string.base': 'As permissões devem ser strings',
      }),
  })
  .min(1)
  .messages({
    'object.min': 'É necessário informar ao menos um campo para atualizar',
    'object.unknown': 'O campo {{#label}} não é permitido',
  });

export const updateRoleParamsValidator = joi.object({
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
