import express, { Router } from "express"
import handlebars from "express-handlebars"
import { ioServerProd, ioServerAddProd, ioServerDelete } from "../daos/socketProd.js"

//variable
const app = express()
const realTimeProducts = new Router()

//const serverSocket
export const ioProducts = async (io, socket) => {
    await ioServerProd(io, socket)
    await ioServerAddProd(io, socket)
    await ioServerDelete(io, socket)
}

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//routes
realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts')
})
realTimeProducts.post('/', async (req, res) => {
    res.render('realTimeProducts')
})
realTimeProducts.delete('/', async (req, res) => {
    res.render('realTimeProducts')
})

//export route
export default realTimeProducts