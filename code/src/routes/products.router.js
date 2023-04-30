import { Router } from "express"
import { getProductsController } from "../controllers/products/getProducts.controller.js"
import { getIdProductsControllers } from "../controllers/products/getIdProducts.controllers.js"
import { postProductsController } from "../controllers/products/postProducts.controller.js"
import { putProductsController } from "../controllers/products/putProducts.controller.js"
import { deleteProductsControllers } from "../controllers/products/deleteProducts.controller.js"

//variables
const router = new Router()

//products router
router.get('/', getProductsController)

router.get('//:pid', getIdProductsControllers)

router.post('/', postProductsController)

router.put('/:pid', putProductsController)

router.delete('/:pid', deleteProductsControllers)

//export router
export default router