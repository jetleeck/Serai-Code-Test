/* eslint-disable prettier/prettier */
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3001),
  PHONE_VALIDATION_API: Joi.string().required(),
  PHONE_VALIDATION_API_KEY: Joi.string().required(),
  EMAIL_VALIDATION_API: Joi.string().required(),
  EMAIL_VALIDATION_API_KEY: Joi.string().required(),
});
