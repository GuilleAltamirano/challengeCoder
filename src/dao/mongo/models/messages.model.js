import { Schema, model } from "mongoose"

const messagesSchema = new Schema({
    message: {type: String, require: true},
    email: {type: String, ref: 'Users.email', require: true},
})

messagesSchema.pre('find', function(){
    this.populate('user')
})

export const messagesModel = model('Messages', messagesSchema)