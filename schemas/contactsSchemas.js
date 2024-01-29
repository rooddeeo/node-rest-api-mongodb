import Joi from "joi";

export const createContactSchema = data =>
	Joi.object({
		name: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		phone: Joi.string().min(8).max(16).required(),
	})
		.options({ abortEarly: false })
		.validate(data, { allowUnknown: true });

export const updateContactSchema = data =>
	Joi.object({
		name: Joi.string().min(2),
		email: Joi.string().email(),
		phone: Joi.string().min(8).max(16),
	})
		.options({ abortEarly: false })
		.validate(data);
