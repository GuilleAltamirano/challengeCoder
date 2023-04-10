import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js";
import { getCartIdController } from "../controllers/cart/getCartId.controller.js";
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js";

//variables
const cartsRouter = new Router()

//carts router
cartsRouter.post('/api/carts', postCartController)

cartsRouter.get('/api/carts/:cid', getCartIdController)

cartsRouter.post('/api/carts/:cid/products/:pid', postProductCartController)

export default cartsRouter