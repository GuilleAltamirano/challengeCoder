import { messagesModel } from "../models/messages.models.js"

class MessagesServices {
    constructor (messages) {
        this.messages = messages
    }

    async getMessages () {
        return this.messages.find().lean()
    }

    async addMessages (message) {
        return this.messages.create(message)
    }
}

export const messagesServices = new MessagesServices(messagesModel)