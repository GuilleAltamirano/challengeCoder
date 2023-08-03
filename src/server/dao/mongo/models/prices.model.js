import { Schema, model } from "mongoose"

const pricesSchema = new Schema({
    cost: {type: Number, require: true, default: 0, min: 0},
    list_one: {type: Number, require: true, default: 0, min: 0},
    list_two: {type: Number, require: true, default: 0, min: 0},
    list_three: {type: Number, require: true, default: 0, min: 0},
    promotion: {
        price: {type: Number, default: 0},
        stock_promotion: {type: Number, default: 1}
    },
})

export const pricesModel = model('Prices', pricesSchema)