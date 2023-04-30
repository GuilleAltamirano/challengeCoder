import { Schema, model } from "mongoose"

const userSchema = new Schema({
    surname: {type: String, require: true, min: 3},
    lastname: {type: String, require: true, min: 3},
    emailAddress: { type: String, required: true},
    password: {type: String, require: true, min: 3}
})

export const usersModel = model('Users', userSchema)