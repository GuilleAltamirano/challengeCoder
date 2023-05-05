import { config } from 'dotenv'
config()
import express from 'express'
import { appConfig } from './config/app.config.js'
import { mongoConfig } from './config/mongo.config.js'
import { socketConfig } from './config/socket.config.js'

//vars
const app = express()
const PORT = process.env.PORT || 8080
await appConfig(app, express) //configs all app

//Data base
await mongoConfig()

//server run
const httpServer = app.listen(PORT, () => {
    console.info(`Server http run in route localhost:${PORT}`)
})
//socket server
await socketConfig(httpServer)