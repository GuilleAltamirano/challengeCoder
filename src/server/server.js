import express from 'express'
import { appConfig } from './config/app.config.js'
// import { socketConfig } from './config/socket.config.js'
import varsEnv from './env/vars.env.js'
import ViteExpress from "vite-express"
import { logger } from './utils/logger.js'
import cluster from 'cluster'
import { cpus } from 'os'
import commander from './utils/commander.js'
console.log(commander.mode);
const app = express()
await appConfig(app, express)
const {PORT} = varsEnv
commander.mode === 'production' ? ViteExpress.config({ mode: "production" }) : ViteExpress.config({ mode: "development" })

if (cluster.isPrimary) {
  logger.info(`Server http run in route localhost:${PORT} ✅`)
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork()
  }
}else {
  const httpServer = app.listen(PORT, () => {
    logger.info(`I'm worked with id: ${process.pid} 🦾`)
  })
  ViteExpress.bind(app, httpServer)
}
// await socketConfig(httpServer)
