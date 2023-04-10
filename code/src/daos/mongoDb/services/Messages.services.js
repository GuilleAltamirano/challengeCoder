import { messagesModel } from "../models/messages.models.js"

class MessagesServices {
    constructor (messages) {
        this.messages = messages
    }

    async getMessages (filter) {
        //filter?
        if (filter) {return this.messages.find(filter).lean()}
        //no filter
        return this.messages.find().lean()
    }

    async addMessages (message) {
        return this.messages.create(message)
    }
}

export const messagesServices = new MessagesServices(messagesModel)