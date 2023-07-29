import { schemaSessions, schemaEmailSessions } from "../validations/joiSessions.validation.js"
import { ApiError } from "../errors/Api.error.js"

export const sessionsValidation =  async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schemaSessions.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`Date invalid`, 400)
            next()
        } catch (err) {next(err)}
    };
};

export const emailsValidation = async (req, res, next) => {
    try {
        const typeSchema = schemaEmailSessions.validate(req.query)
        if (typeSchema.error) throw new ApiError(`Code invalid`, 400)
        next()
    } catch (err) {next(err)}
}
