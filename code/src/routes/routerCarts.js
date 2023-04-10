import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js";
import { getCartIdController } from "../controllers/cart/getCartId.controller.js";
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js";

//variables
const cartsRouter = new Router()

//carts router
cartsRouter.post('', postCartController)

cartsRouter.get('/:cid', getCartIdController)

cartsRouter.post('/:cid/products/:pid', postProductCartController)

export default cartsRouter