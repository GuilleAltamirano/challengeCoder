import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schemaMessage = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().min(1).required()
}).length(2)

export const messagesValidation = async (req, res, next) => {
    try {
        const typeSchema = schemaMessage.validate(req.body)
        if (typeSchema.error) throw new ApiError(`User or password invalid`, 400)
        next()
    } catch (err) {next(err)}
};


