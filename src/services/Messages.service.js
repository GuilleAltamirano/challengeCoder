import { ApiError } from "../errors/Api.error.js"
import { messagesDao, usersDao } from "../dao/factory.dao.js"

class MessagesServices {

    async get () {
        const messages = await messagesDao.get()
        return messages
    }

    async post (data) {
        const { email, message } = data
        const existUser = await usersDao.get({email})
        if (!existUser) throw new ApiError('User invalid', 400)
        const newSms = await messagesDao.post({email, message})
        return newSms
    }

}

export const messagesServices = new MessagesServices()