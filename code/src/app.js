import express from "express"
import handlebars from "express-handlebars"
import {__dirname} from "./utils/utils.js"
import productsRouter from "./routes/routerProducts.js"
import cartsRouter from "./routes/routerCarts.js"
import realTimeProducts from "./routes/realtimeproducts.js"
import { mongoConnect } from "./config/mongoConnect.config.js"
import { socketServer } from "./config/socketConnect.config.js"


//variables
const app = express()
export const PORT = process.env.PORT || 8080

//appUse
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

//db
await mongoConnect()

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//routes
app.use(productsRouter)
app.use(cartsRouter)
app.use(realTimeProducts)

//Server Run
const httpServer = app.listen(PORT, () => {
    console.log(`Server HTTP run in route localhost:${PORT}/api/products`)
})

//server socket
await socketServer(httpServer)