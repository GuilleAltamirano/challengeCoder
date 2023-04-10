import { Server } from "socket.io"
import { PORT } from "../app.js"
import { ioProducts } from "../daos/fs/socketProd.js"

export const socketServer = async (httpServer) => {
    try {
        const io = new Server(httpServer)
        console.log(`Socket server run in route localhost:${PORT}/api/realtimesproducts`)
        io.on('connection', async socket => {
            socket.on('user', user => {
                console.log(user)
            })
            await ioProducts(io, socket)
        })
    } catch (err) {console.error(err)}
}