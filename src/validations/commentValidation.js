const Joi = require("joi");
const { turkishJoi } = require("./language.js");

const commentValidator = Joi.object({
  content: Joi.string().min(3).max(100).required().messages(turkishJoi),
  roomId: Joi.string().required().messages(turkishJoi),
  author: Joi.string().required().messages(turkishJoi),
});
