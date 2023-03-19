import express, { Router } from "express"
import handlebars from "express-handlebars"
import { ProductManager } from "../../manager/products/productManager.js"

//variable
const app = express()
const realTimeProducts = new Router()
const productManager = new ProductManager('./db/productsDb.json')

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//socket
export const ioServer = (io) => {
    io.on('connection', async socket => {
        socket.on('user', user => {
            console.log(user)
        })
        socket.emit('products', await productManager.getProducts())
    })
}


//route
realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts')
})

//export route
export default realTimeProducts