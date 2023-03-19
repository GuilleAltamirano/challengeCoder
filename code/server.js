import express from "express"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import {__dirname} from "./utils.js"
import productsRouter from "./src/routes/routerProducts/routerProducts.js"
import cartsRouter from './src/routes/routerCarts/routerCarts.js'
import realTimeProducts, {ioServer} from "./src/routes/realtimeproducts/realtimeproducts.js"


//variables
const app = express()
const PORT = process.env.PORT || 8080

//appUse
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars')

//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/realtimeproducts', realTimeProducts)

//Server Run
const httpServer = app.listen(PORT, () => {
    console.log(`Server HTTP run in PORT ${PORT}`)
})

//server socket
const socketServer = new Server(httpServer)
//export server
ioServer(socketServer)
