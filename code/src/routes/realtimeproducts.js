import { Router } from "express"

//variable
const realTimeProducts = new Router()

//routes
realTimeProducts.get('/api/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

//export route
export default realTimeProducts