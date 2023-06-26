import mongoosePaginate from 'mongoose-paginate-v2'
import { Schema, model } from "mongoose"

const userSchema = new Schema({
    fullname: {type: String, min: 3},
    first_name: {type: String, require: true, min: 3},
    last_name: {type: String, require: true, min: 3},
    email: { type: String, required: true, unique: { index: { unique: true, sparse: true } }},
    age: { type: Number},
    password: {type: String},
    cart: {type: Schema.Types.ObjectId, ref: 'Carts', required: true},
    role: {type: String, default: 'USER'},
    verified: {type: Boolean, default: false, required: true}
})


userSchema.plugin(mongoosePaginate)
export const usersModel = model('Users', userSchema)