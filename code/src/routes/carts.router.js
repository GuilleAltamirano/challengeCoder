import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js"
import { getCartIdController } from "../controllers/cart/getCartId.controller.js"
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js"
import { getCartsController } from "../controllers/cart/getCarts.controller.js"
import { putUpQuantityController } from "../controllers/cart/putUpQuantity.controller.js"
import { deleteProdInCartController } from "../controllers/cart/deleteProdInCart.controller.js"
import { deleteProdsCartController } from "../controllers/cart/deleteProdsCart.controller.js"

//variables
const router = new Router()

//get carts
router.get('/api/carts', getCartsController)
router.get('/api/carts/:cid', getCartIdController)
//new cart
router.post('/api/carts', postCartController)
// add prod in cart
router.post('/api/carts/:cid/products/:pid', postProductCartController)
//put carts
router.put('/api/carts/:cid/products/:pid', putUpQuantityController)
//delete prod in cart
router.delete('/api/carts/:cid/products/:pid', deleteProdInCartController)
//delete prods in cart
router.delete('/api/carts/:cid', deleteProdsCartController)

export default router