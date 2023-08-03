import Routers from "./router.js"
import { getMessagesController, postMessagesController } from "../controllers/messages.controller.js"
import { messagesValidation } from "../validations/joiMessages.validation.js"
import varsEnv from "../env/vars.env.js"

const {ROLE_PUBLIC, ROLE_USER_BASIC} = varsEnv

class MessagesRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/', [ROLE_PUBLIC], getMessagesController)
        this.post('/', [ROLE_USER_BASIC], messagesValidation, postMessagesController)
    }
}

export const messagesRoute = new MessagesRouter()
