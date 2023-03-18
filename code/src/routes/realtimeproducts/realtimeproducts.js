import express, { Router } from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import httpServer from "../../../server"

//variable
const app = express()
const realTimeProducts = new Router()

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts')
})

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
    socket.on('user', user => {
        console.log(user)
    })
})

export default realTimeProducts