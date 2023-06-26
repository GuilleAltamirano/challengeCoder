import { messagesModel } from "./models/messages.model.js"

export class MessagesDaoMongo {
    constructor () {
        this.messages = messagesModel
    }

    async get () {
        return this.messages.find()
    }

    async post ({email, message}) {
        return this.messages.create({email, message})
    }

    
}

export const messagesDaosMongo = new MessagesDaoMongo()