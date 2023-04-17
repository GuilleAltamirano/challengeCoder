import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js"
import { getCartIdController } from "../controllers/cart/getCartId.controller.js"
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js"
import { getCartsController } from "../controllers/cart/getCarts.controller.js"

//variables
const router = new Router()

//carts router
router.get('/api/carts', getCartsController)

router.post('/api/carts', postCartController)

router.get('/api/carts/:cid', getCartIdController)

router.post('/api/carts/:cid/product/:pid', postProductCartController)

export default router