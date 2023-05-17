import Joi from 'joi';
import TProduct from '../../types/product';

const CODE_ERROR = {
  'any.required': 400,
  'string.empty': 400,
  'string.base': 422,
  'string.min': 422,
};

type TJoiErros = ('any.required'
| 'string.empty' | 'string.base' | 'string.min');

const productValidation = Joi.object().keys({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.empty': '{#label} is required',
  'string.base': '{#label} must be a string',
  'string.min': '{#label} length must be at least 3 characters long',
});

const productValidate = (product: TProduct) => {
  const { error } = productValidation.validate(product);

  if (error) {
    const { details: [{ message, type }] } = error;
    const key = type as TJoiErros;
    return { status: CODE_ERROR[key], message };
  }

  return { status: null, message: '' };
};

export default productValidate;
