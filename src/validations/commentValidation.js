import Joi from "joi";
import { turkishJoi } from "./language.js";

export const commentValidator = Joi.object({
  content: Joi.string().min(3).max(50).required().messages(turkishJoi),
});
