import { Server } from "socket.io"
import { logger } from "../utils/logger.js"

export const socketConfig = async (httpServer) => {
    try {
        const io = new Server(httpServer)
        logger.info('Socket server run')
    } catch (err) {logger.error(err)}
}