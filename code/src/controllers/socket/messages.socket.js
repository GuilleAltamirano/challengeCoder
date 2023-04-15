import { messagesServices } from "../../daos/mongoDb/services/Messages.services.js"

export const ioMessages = async (io, socket) => {
    try {
        socket.on('user', data => {
            socket.broadcast.emit('newUser',data.user)
        })
        socket.on('newMessage', async data => {
            await messagesServices.addMessages(data)
            io.emit('messages', await messagesServices.getMessages())
        })
    } catch (err) {console.error(err)}
}