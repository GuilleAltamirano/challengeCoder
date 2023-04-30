import { Router } from "express";
import { postCartController } from "../controllers/cart/postCart.controller.js"
import { getCartIdController } from "../controllers/cart/getCartId.controller.js"
import { postProductCartController } from "../controllers/cart/postProductCart.controller.js"
import { getCartsController } from "../controllers/cart/getCarts.controller.js"
import { putUpQuantityController } from "../controllers/cart/putUpQuantity.controller.js"
import { deleteProdInCartController } from "../controllers/cart/deleteProdInCart.controller.js"
import { deleteProdsCartController } from "../controllers/cart/deleteProdsCart.controller.js"
import { putUpProdController } from "../controllers/cart/putUpProd.controller.js";

//variables
const router = new Router()

//get carts
router.get('/', getCartsController)
router.get('/:cid', getCartIdController)
//new cart
router.post('/', postCartController)
// add prod in cart
router.post('/:cid/products/:pid', postProductCartController)
//put carts
router.put('/:cid', putUpProdController)
router.put('/:cid/products/:pid', putUpQuantityController)
//delete prod in cart
router.delete('/:cid/products/:pid', deleteProdInCartController)
//delete prods in cart
router.delete('/:cid', deleteProdsCartController)

export default router