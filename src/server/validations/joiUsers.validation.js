import Joi from "joi"

export const schemaUsers = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(15),
    last_name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(15),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    age: Joi.number().integer().min(18).max(120) 
}).alter({
    post: (schema) => schema.required().length(5),
    put: (schema) => schema.min(1),
})

