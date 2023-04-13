import { Router } from "express"

//variable
const realTimeProducts = new Router()

//routes
realTimeProducts.get('/api/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

realTimeProducts.get('/api/chat', async (req, res) => {
    res.render('chat')
})

//export route
export default realTimeProducts