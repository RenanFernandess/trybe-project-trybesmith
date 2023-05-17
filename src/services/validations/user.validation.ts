import Joi from 'joi';
import { TUserRequest } from '../../types/user';

const CODE_ERROR = {
  'any.required': 400,
  'string.empty': 400,
  'string.base': 422,
  'string.min': 422,
  'number.base': 422,
  'number.min': 422,
};

type TJoiErros = ('any.required'
| 'string.empty' | 'string.base' | 'string.min' | 'number.base' | 'number.min');

const userValidation = Joi.object().keys({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
}).required().messages({
  'any.required': '{#label} is required',
  'string.empty': '{#label} is required',
  'string.base': '{#label} must be a string',
  'string.min': '{#label} length must be at least {#limit} characters long',
  'number.base': '{#label} must be a number',
  'number.min': '{#label} must be greater than or equal to 1',
});

const userValidate = (user: TUserRequest) => {
  const { error } = userValidation.validate(user);

  if (error) {
    const { details: [{ message, type }] } = error;
    const key = type as TJoiErros;
    return { status: CODE_ERROR[key], message };
  }

  return { status: null, message: '' };
};

export default userValidate;