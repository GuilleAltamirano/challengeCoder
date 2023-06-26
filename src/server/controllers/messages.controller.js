import { messagesServices } from "../services/Messages.service.js"

export const getMessagesController = async (req, res, next) => {
    try {
        const messages = await messagesServices.get()

        res.jsonSuccess(messages)
    } catch (err) {next(err)}
}

export const postMessagesController = async (req, res, next) => {
    try {
        const {message, email} = req.body

        const newSms = await messagesServices.post({message, email})

        res.jsonSuccess(newSms)
    } catch (err) {next(err)}
}