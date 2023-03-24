import mongoose from "mongoose"

const prodsCollection = 'products'

const prodsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String
})

export const prodsModel = mongoose.model(prodsCollection, prodsSchema)