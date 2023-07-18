import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";
import { logger } from "../utils/logger.js";

const schema = Joi.object({
    title: Joi.string().min(3).max(15),
    description: Joi.string().min(5).max(50),
    code: Joi.string().alphanum().length(6),
    price: Joi.number().min(1),
    stock: Joi.number().min(1),
    category: Joi.string(),
    thumbnails: Joi.array().items(Joi.string())
}).alter({
    post: (schema) => schema.required().min(1),
    put: (schema) => schema.min(1),
})

export const productsValidation = async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schema.tailor(type).validate(req.body)
            if (typeSchema.error) {
                logger.error(typeSchema.error)
                throw new ApiError(`Product keys invalid`, 400)
            }
            next()
        } catch (err) {next(err)}
    };
};


