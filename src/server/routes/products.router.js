import { getProductsController, 
        getProductsByIdController, 
        postProductsController,
        putProductsController,
        deleteProductsController} from "../controllers/products.controller.js"
import Routers from "./router.js"
import { isValidObjectId } from "mongoose"
import { ApiError } from "../errors/Api.error.js"
import { productsValidation } from "../validations/joiProducts.validation.js"

class ProductsRouter extends Routers {
        constructor () {
                super()
                this.router.param('pid', async (req, res, next, pid) => {
                try {
                        if (!isValidObjectId(pid)) throw new ApiError('Param invalid', 400)
                        req.pid = pid
                        next()
                } catch (err) {next(err)}
                })
        }

        async init(){
                this.get('/',['PUBLIC'], getProductsController)
                this.get('/:pid',['USER', 'ADMIN'], getProductsByIdController)

                this.post('/',['ADMIN', 'PREMIUM'], await productsValidation('post'), postProductsController)

                this.put('/:pid',['ADMIN', 'PREMIUM'], await productsValidation('put'), putProductsController)

                this.delete('/:pid',['ADMIN', 'PREMIUM'], deleteProductsController)
        }
}

export const productsRoute = new ProductsRouter()