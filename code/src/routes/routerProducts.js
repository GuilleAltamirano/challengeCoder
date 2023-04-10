import express, { Router } from "express"
import handlebars from "express-handlebars"
import { getProductsController } from "../controllers/products/getProducts.controller.js"
import { getIdProductsControllers } from "../controllers/products/getIdProducts.controllers.js"
import { postProductsController } from "../controllers/products/postProducts.controller.js"
import { putProductsController } from "../controllers/products/putProducts.controller.js"
import { deleteProductsControllers } from "../controllers/products/deleteProducts.controller.js"

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

//export router
export default productsRouter