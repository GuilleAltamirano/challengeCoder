import { Schema, model } from "mongoose"

const productSchema = new Schema({
    title: {type: String, require: true, min: 3},
    description: {type: String, require: true, min: 7},
    code: {type: String, require: true, unique: true},
    price: {type: Number, require: true, min: 0},
    status: {type: Boolean, require: true, default: true},
    stock: {type: Number, require: true, min: 1},
    category: {type: String, require: true},
    thumbnails: [{type: String}]
})

export const productsModel = model('Products', productSchema)