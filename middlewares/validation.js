const Joi = require("joi");

//Register Validatios
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});

//Login Validation
const loginSchema = Joi.object({
  email: Joi.string().max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

//Todo Validation
const todoSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const passwordSchema = Joi.object({
  password: Joi.string().min(6).max(1024).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;
module.exports.todoSchema = todoSchema;
module.exports.passwordSchema = passwordSchema;
