import joi from 'joi';

export const createPostValidator = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'O nome não pode ser vazio',
    'any.required': 'O nome é obrigatório',
  }),
  description: joi.string().required().messages({
    'string.empty': 'A descrição não pode ser vazia',
    'any.required': 'A descrição é obrigatória',
  }),
  ingredients: joi.array().min(1).items(joi.string()).required().messages({
    'array.base': 'Os ingredientes devem ser uma lista',
    'array.min': 'Deve haver pelo menos um ingrediente',
    'any.required': 'Os ingredientes são obrigatórios',
    'string.empty': 'Os ingredientes não podem ser vazios',
  }),
  price: joi.string().regex(new RegExp('^[0-9]+$')).required().messages({
    'string.base': 'O preço deve ser uma string',
    'string.empty': 'O preço não pode ser vazio',
    'string.pattern.base': 'O preço deve ser em centavos',
    'any.required': 'O preço é obrigatório',
  }),
});
