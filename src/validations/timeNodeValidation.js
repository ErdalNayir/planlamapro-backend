import Joi from "joi";

export const nodeValidator = Joi.object({
  header: Joi.string().min(5).max(15).required(),
  description: Joi.string().min(0).max(30),
  state: Joi.string().min(3).max(6).required(),
  startHour: Joi.date().required(),
  finishHour: Joi.date().required(),
});
