import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(15),
    description: Joi.string().min(5).max(50),
    code: Joi.string().alphanum().min(6).max(6),
    price: Joi.number().min(1),
    stock: Joi.number().min(1),
    category: Joi.string(),
    thumbnails: Joi.array().items(Joi.string())
}).alter({
    post: (schema) => schema.required(),
    put: (schema) => schema,
})

export const productsValidation = (type) => {
    return (req, res, next) => {
        try {
            const typeSchema = schema.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`Query invalid`, 400)
            next()
        } catch (err) {next(err)}
    };
};


