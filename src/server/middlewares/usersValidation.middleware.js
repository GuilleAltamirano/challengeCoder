import { ApiError } from "../errors/Api.error.js"
import { schemaUsers } from "../validations/joiUsers.validation.js"

export const usersValidation = async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schemaUsers.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`User keys invalid`, 400)
            next()
        } catch (err) {next(err)}
    }
}