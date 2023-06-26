import { getMessagesController, postMessagesController } from "../controllers/messages.controller.js"
import { messagesValidation } from "../validations/joiMessages.validation.js"
import Routers from "./router.js"

class MessagesRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/', ['PUBLIC'], getMessagesController)
        this.post('/', ['USER'], messagesValidation, postMessagesController)
    }
}

export const messagesRoute = new MessagesRouter()
