import { Router } from "express"
import { getProductsController } from "../controllers/products/getProducts.controller.js"
import { getIdProductsControllers } from "../controllers/products/getIdProducts.controllers.js"
import { postProductsController } from "../controllers/products/postProducts.controller.js"
import { putProductsController } from "../controllers/products/putProducts.controller.js"
import { deleteProductsControllers } from "../controllers/products/deleteProducts.controller.js"
import { multerProductsControllers } from "../controllers/products/multerProducts.controllers.js"
import { upload } from "../utils/multer.js"

//variables
const router = new Router()

//products router
router.get('/api/products', getProductsController)

router.get('/api/products/:pid', getIdProductsControllers)

router.post('/api/products', postProductsController)

router.put('/api/products/:pid', putProductsController)

router.delete('/api/products/:pid', deleteProductsControllers)

router.post('/api/multerProd', upload.single('file'), multerProductsControllers)

//export router
export default router