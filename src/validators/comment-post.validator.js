import joi from 'joi';

export const commentPostBodyValidator = joi.object({
  content: joi.string().required().messages({
    'string.base': 'O comentário deve ser uma string',
    'string.empty': 'O comentário não pode ser vazio',
    'any.required': 'O comentário é obrigatório',
  }),
});

export const commentPostParamsValidator = joi.object({
  id: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId Regex
    .required()
    .messages({
      'string.base': 'O id deve ser uma string',
      'string.empty': 'O id não pode ser vazio',
      'any.required': 'O id é obrigatório',
      'string.pattern.base': 'O id deve ser um ObjectId válido',
    }),
});
