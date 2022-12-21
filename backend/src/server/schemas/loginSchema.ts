import Joi = require('joi');

const RESPONSE = 'All fields must be filled';

const loginSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': RESPONSE,
    'string.empty': RESPONSE,
    'string.min': 'Must have at least 3 characters',

  }),
  password: Joi.string().min(8).regex(/^(?=^.{8,}$)((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*^/).required().messages({
    'any.required': RESPONSE,
    'string.empty': RESPONSE,
    'string.min': 'Must have at least 8 characters',
    'string.pattern.base': 'Must have at least one uppercase character and a number'
  }),
});

export default loginSchema;
