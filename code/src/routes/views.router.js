import { Router } from "express"
import { homeController } from "../controllers/view/home.controller.js"
import { userServices } from "../daos/mongoDb/services/Users.services.js"

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

router.get('/register', async (req, res) => {
    res.status(200).render('signUp')
})

router.get('/login', async (req, res) => {
    res.status(200).render('login')
})

router.get('/profile', async (req, res) => {
    const { email, role } = req.session
    const date = await userServices.getUsers({emailAddress: email})
    const profile = {
        name: date[0].surname,
        lastname: date[0].lastname,
        email,
        role
    }
    res.status(200).render('profile', profile)
})

router.get('*', async(req, res) => {
    res.status(404).render('undefined')
})

//export route
export default router