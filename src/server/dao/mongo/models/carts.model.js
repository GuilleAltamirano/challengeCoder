import { Schema, model } from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Products', required: true},
        quantity: {type: Number, required: true, min: 1},
    }]
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

cartSchema.plugin(mongoosePaginate)

export const cartsModel = model('Carts', cartSchema)