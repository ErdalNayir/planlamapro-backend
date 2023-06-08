import Joi from "joi";
import { turkishJoi } from "./language.js";

export const nodeValidator = Joi.object({
  id: Joi.string().required().messages(turkishJoi),
  header: Joi.string().min(5).max(15).required().messages(turkishJoi),
  description: Joi.string().min(0).max(100).messages(turkishJoi),
  state: Joi.string().min(3).max(15).required().messages(turkishJoi),
  startHour: Joi.string().required().messages(turkishJoi),
  roomId: Joi.string().required().messages(turkishJoi),
  positionAbsolute: Joi.object().required().messages(turkishJoi),
});
