import { Schema, model } from "mongoose"

const messagesSchema = new Schema({
    message: [{type: String, require: true}],
    user: {type: String, require: true},
    fyh: {type: Date, default: Date.now}
})

export const messagesModel = model('Messages', messagesSchema)
