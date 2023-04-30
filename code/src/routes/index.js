import { Router } from "express"
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import viewsRouter from "./views.router.js"
import usersRouter from "./users.router.js"
import sessionsRouter from "./sessions.router.js"
import cookiesRouter from "./cookies.router.js"
import imagesRouter from './images.router.js'

export const router = Router()

router.use('/api/products',  productsRouter)
router.use('/api/images', imagesRouter)
router.use('/api/carts',  cartsRouter)
router.use('/api/users',  usersRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/cookies',  cookiesRouter)
router.use('/', viewsRouter)