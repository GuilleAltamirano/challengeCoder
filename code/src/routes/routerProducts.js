import express, { Router } from "express"
import handlebars from "express-handlebars"
import { getProductsController } from "../controllers/products/getProducts.controller.js"
import { getIdProductsControllers } from "../controllers/products/getIdProducts.controllers.js"
import { postProductsController } from "../controllers/products/postProducts.controller.js"
import { putProductsController } from "../controllers/products/putProducts.controller.js"
import { deleteProductsControllers } from "../controllers/products/deleteProducts.controller.js"
import { multerPRoductsControllers } from "../controllers/products/multerProducts.controllers.js"
import { upload } from "../utils/multer.js"

//variables
const app = express()
const productsRouter = new Router()

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//products router
productsRouter.get('/api/products', getProductsController)

productsRouter.get('/api/products/:pid', getIdProductsControllers)

productsRouter.post('/api/products', postProductsController)

productsRouter.put('/api/products/:pid', putProductsController)

productsRouter.delete('/api/products/:pid', deleteProductsControllers)

productsRouter.post('/api/multerProd', upload.single('file'), multerPRoductsControllers)

//export router
export default productsRouter