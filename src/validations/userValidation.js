const Joi = require("joi");
const { turkishJoi } = require("./language.js");

const signupSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
  surname: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
  age: Joi.number().integer().min(12).max(99),
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .min(6)
    .max(20)
    .required()
    .messages(turkishJoi),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>~\[\]\\_+-]+$/u)
    .min(6)
    .max(20)
    .required()
    .messages(turkishJoi),
  confirmPassword: Joi.ref("password"),
  gender: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
});

const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
  surname: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
  age: Joi.number().integer().min(12).max(99),
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .min(6)
    .max(20)
    .required()
    .messages(turkishJoi),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>~\[\]\\_+-]+$/u)
    .min(6)
    .max(20)
    .required()
    .messages(turkishJoi),
  gender: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .required()
    .messages(turkishJoi),
});
