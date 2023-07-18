import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

//for login and forgot-password
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
}).alter({
    forgot: (schema) => schema,
    login: (schema) => schema.required(),
}).min(1).max(2)

const schemaEmail = Joi.object({
    code: Joi.string().alphanum()
}).length(1)

export const sessionsValidation =  async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schema.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`Date invalid`, 400)
            next()
        } catch (err) {next(err)}
    };
};

export const emailsValidation = async (req, res, next) => {
    try {
        const typeSchema = schemaEmail.validate(req.body)
        if (typeSchema.error) throw new ApiError(`Code invalid`, 400)
        next()
    } catch (err) {next(err)}
}


