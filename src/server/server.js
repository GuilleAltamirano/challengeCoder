import express from 'express'
import { appConfig } from './config/app.config.js'
// import { socketConfig } from './config/socket.config.js'
import varsEnv from './env/vars.env.js'
import ViteExpress from "vite-express"
import { logger } from './utils/logger.js'
import cluster from 'cluster'
import { cpus } from 'os'

const app = express()
await appConfig(app, express)

if (cluster.isPrimary) {
  logger.info(`Server http run in route localhost:${varsEnv.PORT} ✅`)
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork()
  }
}else {
  const httpServer = app.listen(varsEnv.PORT, () => {
    logger.info(`I'm worked with id: ${process.pid} 🦾`)
  })
  ViteExpress.bind(app, httpServer)
}
// await socketConfig(httpServer)

// commander.mode === 'production' ? ViteExpress.config({ mode: "production" }) : ViteExpress.config({ mode: "development" })