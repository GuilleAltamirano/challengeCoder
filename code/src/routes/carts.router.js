import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js";
import { getCartIdController } from "../controllers/cart/getCartId.controller.js";
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js";

//variables
const route = new Router()

//carts router
route.post('/api/carts', postCartController)

route.get('/api/carts/:cid', getCartIdController)

route.post('/api/carts/:cid/products/:pid', postProductCartController)

export default route