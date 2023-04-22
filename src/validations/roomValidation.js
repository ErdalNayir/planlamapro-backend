import Joi from "joi";

var date = new Date();

var currDate = date.getFullYear();
var maxDate = date.getFullYear() + 100;

export const roomValidator = Joi.object({
  roomName: Joi.string().min(5).max(25).required(),
  startDate: Joi.string().required().min(currDate).max(maxDate).isoDate(),
  description: Joi.string().min(5).max(150).required(),
});
