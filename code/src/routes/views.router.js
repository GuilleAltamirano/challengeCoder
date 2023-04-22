import { Router } from "express"
import { homeController } from "../controllers/view/home.controller.js"

//variable
const router = new Router()

//routes
router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts')
})

router.get('/chats', async (req, res) => {
    res.render('chat')
})

router.get('/', homeController)

router.get('/carts/:cid', async(req,res) => {
    res.status(200).render('cart')
})

router.get('*', async(req, res) => {
    res.status(404).render('undefined')
})

//export route
export default router