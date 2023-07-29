import Joi from "joi";

export const schemaProducts = Joi.object({
    title: Joi.string().min(3).max(15),
    description: Joi.string().min(5).max(50),
    code: Joi.string().alphanum().length(6),
    price: Joi.number().min(1),
    stock: Joi.number().min(1),
    category: Joi.string(),
    thumbnails: Joi.array().items(Joi.string())
}).alter({
    post: (schema) => schema.required().min(6).max(7),//thumbnails optional
    put: (schema) => schema.min(1).max(7),
})