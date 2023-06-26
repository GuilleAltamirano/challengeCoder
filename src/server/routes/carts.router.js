import Routers from "./router.js"
import { isValidObjectId } from "mongoose"
import { ApiError } from "../errors/Api.error.js"
import { getCartsController, getCartByIdController, postCarts, postProdInCartController, postPurchaseController, putCartController, putQuantityProds, delProdInCart } from "../controllers/carts.controller.js"
import { cartsValidation } from "../validations/joiCarts.validation.js"

class CartsRouter extends Routers {
    constructor () {
        super()
        this.router.param('cid', async (req, res, next, cid) => {
            try {
                if (!isValidObjectId(cid)) throw new ApiError('Param invalid', 400)
                req.cid = cid
                next()
            } catch (err) {next(err)}
        })
        this.router.param('pid', async (req, res, next, pid) => {
            try {
                if (!isValidObjectId(pid)) throw new ApiError('Param invalid', 400)
                req.pid = pid
                next()
            } catch (err) {next(err)}
        })
    }

    async init(){
        this.get('/',['ADMIN'], await cartsValidation('paginate'),getCartsController)
        this.get('/:cid',['ADMIN'], getCartByIdController)

        this.post('/',['ADMIN'], postCarts)
        this.post('/:cid/products/:pid',['USER'], postProdInCartController)
        this.post('/:cid/purchase', ['USER'], postPurchaseController)

        this.put('/:cid',['USER'], await cartsValidation('put'),putCartController)
        this.put('/:cid/products/:pid', ['USER'], await cartsValidation('putQty'),putQuantityProds)
        
        this.delete('/:cid/products/:pid', ['USER'], delProdInCart)
        this.delete('/:cid', ['USER'], putCartController)
    }
}

export const cartsRoute = new CartsRouter()