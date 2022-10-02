import joi from 'joi';

export const listPostFilterValidator = joi.object({
  filter: joi
    .object({
      maxPrice: joi.number().integer().min(0).optional().messages({
        'number.base': 'O preço máximo deve ser um número',
        'number.integer': 'O preço máximo deve ser um número inteiro',
        'number.min': 'O preço máximo deve ser maior ou igual a 0',
      }),
      ingredients: joi.array().min(1).items(joi.string()).optional().messages({
        'array.base': 'Os ingredientes devem ser uma lista',
        'array.min': 'Deve haver pelo menos um ingrediente',
        'string.empty': 'Os ingredientes não podem ser vazios',
      }),
    })
    .optional()
    .messages({
      'object.base': 'O filtro deve ser um objeto',
      'object.unknown': 'O filtro não pode ter propriedades desconhecidas',
    }),
});
