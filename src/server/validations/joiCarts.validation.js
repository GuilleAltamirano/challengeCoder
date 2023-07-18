import Joi from "joi";
import { ApiError } from "../errors/Api.error.js";

const schemaPaginate = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(12),
    product: Joi.string().alphanum(),
    sort: Joi.string().valid('asc', 'desc')
})

const schemaPut = Joi.object({
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().length(24).alphanum().required(),
            quantity: Joi.number().required()
        })
    )
})

const schemaPutQty = Joi.object({
    quantity: Joi.number().min(1)
})

export const cartsValidation = async (type) => {
    return async (req, res, next) => {
        try {
            if (type === 'paginate'){
                const typeSchema = schemaPaginate.validate(req.query)
                if (typeSchema.error) throw new ApiError(`Query invalid`, 400)
                next()
            }
            if (type === 'put') {
                const typeSchema = schemaPut.validate(req.body)
                if (typeSchema.error) throw new ApiError(`Query invalid`, 400)
                next()
            }

            if (type === 'putQty') {
                const typeSchema = schemaPutQty.validate(req.body)
                if (typeSchema.error) throw new ApiError(`Query invalid`, 400)
                next()
            }
        } catch (err) {next(err)}
    };
};


