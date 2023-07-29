import Joi from "joi";

//for login and forgot-password
export const schemaSessions = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
}).alter({
    forgot: (schema) => schema.length(1), //only email
    login: (schema) => schema.required().length(2), //both required 
})

export const schemaEmailSessions = Joi.object({
    code: Joi.string().alphanum().required()
}).min(1)


