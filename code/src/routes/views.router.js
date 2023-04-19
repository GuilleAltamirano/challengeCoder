import { Router } from "express"
import { productsServices } from "../daos/mongoDb/services/Products.services.js"

//variable
const router = new Router()

//routes
router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

router.get('/chats', async (req, res) => {
    res.render('chat')
})

router.get('/', async (req,res)=>{
    const { filter={},limit=5, page=1 } = req.query

    const allProducts = await productsServices.productsPaginate({ filter, limit, page })
    res.render('home',{
        products: allProducts
    })
    // res.json(allProducts)
})

router.get('*', async(req, res) => {
    res.status(404).render('undefined')
})

//export route
export default router