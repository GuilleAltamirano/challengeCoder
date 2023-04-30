import { Router } from "express"
import { multerProductsControllers } from "../controllers/products/multerProducts.controllers.js"
import { upload } from "../utils/multer.js"

const router = new Router()


router.post('/', upload.single('file'), multerProductsControllers)

export default router