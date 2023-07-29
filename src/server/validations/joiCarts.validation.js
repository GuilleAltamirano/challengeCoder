import Joi from "joi";

export const schemaPaginateCarts = Joi.object({
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(12),
    product: Joi.string().alphanum(),
    sort: Joi.string().valid('asc', 'desc')
})

export const schemaPutCarts = Joi.object({
    products: Joi.array().items(
        Joi.object({
            product: Joi.string().length(24).alphanum().required(),
            quantity: Joi.number().required()
        })
    )
})

export const schemaPutQtyCarts = Joi.object({
    quantity: Joi.number().min(1)
})