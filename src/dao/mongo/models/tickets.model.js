import { Schema, model } from "mongoose"

const ticketsSchema = new Schema({
    code: {
        type: String,
        default: () => Math.random().toString(36).substring(2, 8), // Generates a random string of 6 characters
        unique: true
    },
    purchase_datetime: { type: Date, default: Date.now, required: true },
    amount: {type: Number, min: 1, required: true},
    purchaser: {type: String, required: true, ref: 'Users.email'}
})

ticketsSchema.pre('find', function(){
    this.populate('purchaser')
})

export const ticketsModel = model('Tickets', ticketsSchema)