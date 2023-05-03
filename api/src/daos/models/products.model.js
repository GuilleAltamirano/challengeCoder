import { Schema, model } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    title: {type: String, require: true, min: 3},
    description: {type: String, require: true, min: 7},
    code: {type: String, require: true, unique: true},
    price: {type: Number, require: true, min: 0},
    status: {type: Boolean, require: true, default: true, index: true},
    stock: {type: Number, require: true, min: 1},
    category: {type: String, require: true},
    thumbnails: {
        type: [String], 
        default: ['https://placehold.co/300x300'], 
        set: thumbnails => (thumbnails[0] === '' ? ['https://placehold.co/300x300'] : thumbnails)
    }
})

productSchema.plugin(mongoosePaginate)

export const productsModel = model('Products', productSchema)