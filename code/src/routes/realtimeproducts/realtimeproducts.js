import express, { Router } from "express"
import handlebars from "express-handlebars"
import { upload } from "../../utils/multer.js"
import { ProductManager } from "../../manager/products/productManager.js"

//variable
const app = express()
const realTimeProducts = new Router()
const productManager = new ProductManager('./src/db/productsDb.json')

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
        socket.on('newProduct', async newProduct => {
            await productManager.getAddProducts(newProduct)
        })
        socket.on('idProd', async id => {
            await productManager.getDeleteProduct(id)
        })
    })
}


//route
realTimeProducts.get('/', upload.single('file'), async (req, res) => {
    res.render('realTimeProducts')
})
realTimeProducts.post('/', async (req, res) => {
    res.render('realTimeProducts')
})

//export route
export default realTimeProducts