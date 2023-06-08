import { Server } from "socket.io"

export const socketConfig = async (httpServer) => {
    try {
        const io = new Server(httpServer)
        console.info('Socket server run')
    } catch (err) {console.error(err)}
}