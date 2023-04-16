import express from "express"
import { mongoConnect } from "./config/mongoConnect.config.js"
import { socketServer } from "./config/socketConnect.config.js"
import { appConfig } from "./config/app.config.js"


//variables
const app = express()
export const PORT = process.env.PORT || 8080

//appUse
appConfig(app, express)

//db
await mongoConnect()

//Server Run
const httpServer = app.listen(PORT, () => {
    console.log(`Server HTTP run in route localhost:${PORT}`)
})

//server socket
await socketServer(httpServer)
