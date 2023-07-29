import { schemaProducts } from "../validations/joiProducts.validation.js"
import { ApiError } from "../errors/Api.error.js"

export const productsValidation = async (type) => {
    return async (req, res, next) => {
        try {
            const typeSchema = schemaProducts.tailor(type).validate(req.body)
            if (typeSchema.error) throw new ApiError(`Product keys invalid`, 400)
            
            next()
        } catch (err) {next(err)}
    };
};