import { Server } from "socket.io"
import { PORT } from "../app.js"
import { ioProducts } from "../controllers/socket/products.socket.js"
import { ioMessages } from "../controllers/socket/messages.socket.js"

export const socketServer = async (httpServer) => {
    try {
        const io = new Server(httpServer)
        console.log(`Socket server run in route localhost:${PORT}/realtimesproducts`)
        io.on('connection', async socket => {
            socket.on('user', user => {
                console.log(user)
            })
            await ioProducts(io, socket)
            await ioMessages(io, socket)
        })
    } catch (err) {console.error(err)}
}