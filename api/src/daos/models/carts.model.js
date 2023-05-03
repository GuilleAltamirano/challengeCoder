import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Products', required: true},
        quantity: {type: Number, required: true, min: 1},
    }]
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

export const cartsModel = model('Carts', cartSchema)