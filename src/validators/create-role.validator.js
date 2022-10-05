import joi from 'joi';

export const createRoleBodyValidator = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'O nome não pode ser vazio',
    'any.required': 'O nome é obrigatório',
  }),
  key: joi
    .string()
    .regex(/[A-Z0-9]+(?:_[A-Z0-9]+)*/)
    .required()
    .messages({
      'string.empty': 'A chave do papel não pode ser vazia',
      'any.required': 'A chave do papel é obrigatória',
      'string.pattern.base': 'A chave do papel deve ser apenas letras maiúsculas e/ou dígitos e separada por _',
      'string.base': 'A chave do papel deve ser uma string',
    }),
  permissions: joi
    .array()
    .min(1)
    .items(joi.string().regex(/[a-z]+:[a-z]+/))
    .required()
    .messages({
      'array.base': 'As permissões devem ser uma lista',
      'array.min': 'Deve haver pelo menos uma permissão',
      'any.required': 'As permissões são obrigatórias',
      'string.empty': 'As permissões não podem ser vazias',
      'string.pattern.base': 'As permissões devem ser no formato <action>:<resource>',
      'string.base': 'As permissões devem ser strings',
    }),
});
