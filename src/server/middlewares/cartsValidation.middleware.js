import { schemaPutQtyCarts, schemaPaginateCarts, schemaPutCarts } from "../validations/joiCarts.validation.js"
import { ApiError } from "../errors/Api.error.js"

const errVar = 'Query invalid'

export const cartsValidation = async (type) => {
    return async (req, res, next) => {
        try {
            if (type === 'paginate'){
                const typeSchema = schemaPaginateCarts.validate(req.query)
                if (typeSchema.error) throw new ApiError(errVar, 400)
                next()
            }
            if (type === 'put') {
                const typeSchema = schemaPutCarts.validate(req.body)
                if (typeSchema.error) throw new ApiError(errVar, 400)
                next()
            }

            if (type === 'putQty') {
                const typeSchema = schemaPutQtyCarts .validate(req.body)
                if (typeSchema.error) throw new ApiError(errVar, 400)
                next()
            }
        } catch (err) {next(err)}
    }
}