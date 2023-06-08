import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export const sessionsValidation = (req, res, next) => {
    try {
        const typeSchema = schemaLogin.validate(req.body)
        if (typeSchema.error) throw new ApiError(`User or password invalid`, 400)
        next()
    } catch (err) {next(err)}
};


