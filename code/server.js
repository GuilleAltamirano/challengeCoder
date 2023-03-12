import express, {query} from "express";
import { ProductManager } from "./manager/productManager.js";
import { ProductsValidators } from "./manager/productsValidators.js";

//variables
const app = express()
const PORT = process.env.PORT || 8080
const productManager = new ProductManager('./db/productsDb.json')
const productsValidators = new ProductsValidators(productManager.getProducts())

//appUse
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//rest
app.get('/api/products', async (req, res) => {
    res.send(await productsValidators.logicQuery(req.query))
})

app.get('/api/products/:id', async (req, res) => {
    res.send(await productManager.getProductById(JSON.parse(req.params.id)))
})

//Server Run
app.listen(PORT, () => {
    console.log(`Server HTTP run in PORT ${PORT}`)
})