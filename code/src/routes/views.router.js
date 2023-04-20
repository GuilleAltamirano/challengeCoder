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
    const { page=1, limit=10 } = req.query
    const { docs, 
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage, 
    } = await productsServices.productsPaginate({page, limit})

    res.render('home',{
        products: docs,
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage
    })

})

router.get('*', async(req, res) => {
    res.status(404).render('undefined')
})

//export route
export default router