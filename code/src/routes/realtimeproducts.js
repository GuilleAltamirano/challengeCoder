import express, { Router } from "express"
import { ioProducts } from "../daos/fs/socketProd.js"

//variable
const app = express()
const realTimeProducts = new Router()

export const ioProductsConnection = async (io, socket) => {
    await ioProducts(io, socket)
}

//routes
realTimeProducts.get('/api/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

//export route
export default realTimeProducts