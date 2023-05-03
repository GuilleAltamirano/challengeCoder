import { Router } from "express"
import { getProductsController, 
        getProductsByIdController, 
        postProductsController,
        putProductsController,
        deleteProductsController} from "../controllers/products.controller.js"

//var
const router = Router()

router.get('/', getProductsController)
router.get('/:pid', getProductsByIdController)

router.post('/', postProductsController)

router.put('/:pid', putProductsController)

router.delete('/:pid', deleteProductsController)

export default router