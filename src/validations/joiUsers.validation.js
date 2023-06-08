import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(15),
    last_name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(15),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    age: Joi.number().integer().min(18).max(120) 
}).alter({
    post: (schema) => schema.required(),
    put: (schema) => schema,
})

export const usersValidation = (type) => {
    return (req, res, next) => {
        try {
            const typeSchema = schema.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`${typeSchema.error.message}`, 400)
            next()
        } catch (err) {next(err)}
    };
};


