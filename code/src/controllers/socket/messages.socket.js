import { messagesServices } from "../../daos/mongoDb/services/Messages.services.js"
let messages = []

export const ioMessages = async (io, socket) => {
    try {
        socket.on('user', data => {
            socket.broadcast.emit('newUser',data.user)
        })
        socket.on('newMessage', data => {
            messages.push(data)
            io.emit('messages', messages)
        })
    } catch (err) {console.error(err)}
}