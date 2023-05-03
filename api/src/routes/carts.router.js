import { Router } from "express"
import { getCartsController, 
    getCartByIdController, 
    postCarts, 
    postProdInCartController, 
    putCartController,
    putQuantityProds,
    delProdInCart } from "../controllers/carts.controller.js"

const router = Router()

router.get('/', getCartsController)
router.get('/:cid', getCartByIdController)

router.post('/', postCarts)
router.post('/:cid/products/:pid', postProdInCartController)

router.put('/:cid', putCartController)
router.put('/:cid/products/:pid', putQuantityProds)

router.delete('/:cid/products/:pid', delProdInCart)
router.delete('/:cid', putCartController)//It uses the same controller since they do the same operation

export default router