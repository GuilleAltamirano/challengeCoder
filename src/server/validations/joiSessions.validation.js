import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
}).alter({
    login: (schema) => schema.required(),
    forgot: (schema) => schema,
})

const schemaEmail = Joi.object({
    code: Joi.string().alphanum()
})

export const sessionsValidation =  async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schemaLogin.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`Query invalid`, 400)
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


