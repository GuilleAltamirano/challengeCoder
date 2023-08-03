import { getProductsController, 
        getProductsByIdController, 
        postProductsController,
        putProductsController,
        deleteProductsController,
        postUploadThumbnailsController} from "../controllers/products.controller.js"
import Routers from "./router.js"
import { isValidObjectId } from "mongoose"
import { ApiError } from "../errors/Api.error.js"
import { productsValidation } from "../middlewares/productsValidation.middleware.js"
import { uploadThumbnails } from "../middlewares/upload.middleware.js"
import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED, ROLE_USER_BASIC, ROLE_PUBLIC} = varsEnv

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
                this.get('/',[ROLE_PUBLIC], getProductsController)
                this.get('/:pid',[ROLE_USER_BASIC, ROLE_USER_ADVANCED,SUPERIOR_PRIVILEGES], getProductsByIdController)

                this.post('/', [SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], await productsValidation('post'), postProductsController)
                this.post('/uploadThumbnails', [SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], uploadThumbnails, postUploadThumbnailsController)

                this.put('/:pid',[SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], await productsValidation('put'), putProductsController)

                this.delete('/:pid',[SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], deleteProductsController)
        }
}

export const productsRoute = new ProductsRouter()