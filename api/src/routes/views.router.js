import { Router } from "express"
import { cartController, indexController } from "../controllers/views.controller.js"

const router = Router()

router.get('/login', async (req, res, next) => {
    try {
        res.status(200).render('login')
    } catch (err) {next(err)}
})

router.get('/register', async (req, res, next) => {
    try {
        res.status(200).render('register')
    } catch (err) {next(err)}
})

router.get('/', indexController)

router.get('/carts/:cid', cartController)

router.get ('/profile', async (req, res, next) => {
    try {
        const session = req.session

        res.status(200).render('profile', {
            status: 'success',
            payload: session
        })
    } catch (err) {next(err)}
})


export default router