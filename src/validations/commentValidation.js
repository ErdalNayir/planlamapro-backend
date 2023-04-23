import Joi from "joi";

export const commentValidator = Joi.object({
  content: Joi.string().min(3).max(50).required(),
});
