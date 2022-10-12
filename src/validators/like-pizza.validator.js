import joi from 'joi';

export const likePizzaParamsValidator = joi.object({
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
