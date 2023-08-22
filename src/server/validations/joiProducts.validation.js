import Joi from "joi";

export const schemaProducts = Joi.object({
    title: Joi.string().min(3).max(25),
    description: Joi.string().min(5).max(50),
    code: Joi.string().alphanum().length(6),
    prices: Joi.object({
        cost: Joi.number().min(1),
        list_one: Joi.number().min(1),
        list_two: Joi.number().min(1),
        list_three: Joi.number().min(1),
        promotion: Joi.number().min(1),
    }).min(4).max(5),
    stock: Joi.number().min(1),
    category: Joi.string(),
    promotion: Joi.string(),
    provider: Joi.string(),
    thumbnails: Joi.array().items(Joi.string()).max(5)
}).alter({
    post: (schema) => schema.required().min(6).max(8),//thumbnails optional
    put: (schema) => schema.min(1).max(7),
})