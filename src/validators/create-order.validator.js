import joi from 'joi';

export const createOrderBodyValidator = joi.object({
  pizza: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId Regex
    .required()
    .messages({
      'string.empty': 'A pizza não pode ser vazia',
      'string.pattern.base': 'A pizza deve ser um ObjectId válido',
      'any.required': 'A pizza é obrigatória',
    }),
  quantity: joi.number().min(1).required().messages({
    'number.base': 'A quantidade deve ser um número',
    'number.empty': 'A quantidade não pode ser vazia',
    'any.required': 'A quantidade é obrigatória',
    'number.min': 'A quantidade deve ser maior ou igual a 1',
  }),
  address: joi.string().optional().messages({
    'string.empty': 'O endereço não pode ser vazio',
  }),
  note: joi.string().optional().messages({
    'string.empty': 'A observação não pode ser vazia',
  }),
});