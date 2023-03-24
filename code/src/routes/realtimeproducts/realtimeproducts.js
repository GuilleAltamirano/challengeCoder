import express, { Router } from "express"
import handlebars from "express-handlebars"
import { upload } from "../../utils/multer.js"
import { ioServerProd, ioServerAddProd, ioServerDelete } from "../../manager/sockets/socketProd.js"

//variable
const app = express()
const realTimeProducts = new Router()

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')


//routes
realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts', { ioServerProd })
})
realTimeProducts.post('/', upload.single('file'), async (req, res) => {
    res.render('realTimeProducts', { ioServerAddProd })
})
realTimeProducts.delete('/', async (req, res) => {
    res.render('realTimeProducts', { ioServerDelete })
})

//export route
export default realTimeProducts