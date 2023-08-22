import Routers from "./router.js"
import { isValidObjectId } from "mongoose"
import { ApiError } from "../errors/Api.error.js"
import { getCartsController, getCartByIdController, postCarts, postProdInCartController, postPurchaseController, putCartController, putQuantityProds, delProdInCart } from "../controllers/carts.controller.js"
import { cartsValidation } from "../middlewares/cartsValidation.middleware.js"
import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED, ROLE_USER_BASIC} = varsEnv

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
        this.get('/',[SUPERIOR_PRIVILEGES], await cartsValidation('paginate'),getCartsController)
        this.get('/:cid',[ROLE_USER_ADVANCED, ROLE_USER_BASIC], getCartByIdController)

        this.post('/',[SUPERIOR_PRIVILEGES], postCarts)
        this.post('/:cid/products/:pid',[ROLE_USER_BASIC, ROLE_USER_ADVANCED], postProdInCartController)
        this.post('/:cid/purchase', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], postPurchaseController)

        this.put('/:cid',[ROLE_USER_BASIC, ROLE_USER_ADVANCED], await cartsValidation('put'),putCartController)
        this.put('/:cid/products/:pid', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], await cartsValidation('putQty'),putQuantityProds)
        
        this.delete('/:cid/products/:pid', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], delProdInCart)
        this.delete('/:cid', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], putCartController)
    }
}

export const cartsRoute = new CartsRouter()