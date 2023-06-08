import Joi from "joi";
import { turkishJoi } from "./language.js";

var date = new Date();

var currDate = date.getFullYear();
var maxDate = date.getFullYear() + 100;

export const roomValidator = Joi.object({
  roomId: Joi.string().messages(turkishJoi),
  roomName: Joi.string().min(5).max(25).required().messages(turkishJoi),
  startDate: Joi.date().required().messages(turkishJoi),
  description: Joi.string().min(5).max(150).required().messages(turkishJoi),
  creatorId: Joi.string(),
});
