import { Schema, model } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
import varsEnv from '../../../env/vars.env.js'

const {STATUS_PRODUCTS, SUPERIOR_PRIVILEGES} = varsEnv

const productSchema = new Schema({
    title: {type: String, require: true, min: 3, max: 25},
    description: {type: String, require: true, min: 7, max: 50},
    code: {type: String, require: true, unique: true},
    prices: {type: Schema.Types.ObjectId, ref: 'Prices', require: true},
    status: {type: String, require: true, default: STATUS_PRODUCTS, index: true},
    stock: {type: Number, require: true, min: 1, max: 99999999},
    category: {type: String, require: true},
    owner: {type: String, default: SUPERIOR_PRIVILEGES},
    promotion: {type: String, default: 'No promotion'},
    provider: {type: String, require: true},
    thumbnails: {
        type: [String], 
        default: ['https://placehold.co/300x300'], 
        set: thumbnails => (thumbnails[0] === '' ? ['https://placehold.co/300x300'] : thumbnails)
    }
})

productSchema.pre('find', function(){
    this.populate('prices')
})

productSchema.plugin(mongoosePaginate)

export const productsModel = model('Products', productSchema)