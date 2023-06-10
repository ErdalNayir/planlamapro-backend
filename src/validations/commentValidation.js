import Joi from "joi";
import { turkishJoi } from "./language.js";

export const commentValidator = Joi.object({
  content: Joi.string().min(3).max(100).required().messages(turkishJoi),
  roomId: Joi.string().required().messages(turkishJoi),
  author: Joi.string().required().messages(turkishJoi),
});
