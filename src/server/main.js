import express from 'express'
import { appConfig } from './config/app.config.js'
import { socketConfig } from './config/socket.config.js'
import varsEnv from './env/vars.env.js'
import ViteExpress from "vite-express"
import { logger } from './utils/logger.js'
import {cpus} from 'os'

const app = express()
await appConfig(app, express)

logger.info(cpus().length)

const httpServer = app.listen(varsEnv.PORT, () => {
  logger.info(`Server http run in route localhost:${varsEnv.PORT} ✅`)
})

await socketConfig(httpServer)
ViteExpress.bind(app, httpServer)