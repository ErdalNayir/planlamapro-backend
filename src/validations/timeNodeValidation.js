import Joi from "joi";

export const roomValidator = Joi.object({
  header: Joi.string().min(5).max(15).required(),
  description: Joi.string().min(0).max(30),
  state: Joi.string().min(3).max(6).required(),
  startHour: Joi.date().min(new Date().getFullYear).required(),
  finishHour: Joi.date().required(),
});
