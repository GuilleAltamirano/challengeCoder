import { Router } from "express"
import productsRouter from './products.router.js'
import cartsRouter from './carts.router.js'
import uploadsRouter from './uploads.router.js'
import sessionsRouter from './sessions.router.js'
import viewsRouter from './views.router.js'

//var
const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/uploads', uploadsRouter) //route and controller together
router.use('/api/sessions', sessionsRouter)
router.use('/', viewsRouter)

export default router