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
    email_verified: {type: String, default: 'Disable', required: true},
    status: {type: String, default: 'DocumentsIncomplete'},
    profile: {type: String, default: 'https://placehold.co/300x300'},
    documents: [{
        name: {type: String},
        reference: {type: String}
    }],
    last__connection: {type: Date, default: Date.now()}
})


userSchema.plugin(mongoosePaginate)
export const usersModel = model('Users', userSchema)