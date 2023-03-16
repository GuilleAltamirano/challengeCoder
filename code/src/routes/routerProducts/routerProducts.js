import { Router } from "express"
import { ProductManager } from "../../manager/products/productManager.js"
import { ProductsValidators } from "../../manager/products/productsValidators.js"

//variables
const productsRouter = new Router()
const productManager = new ProductManager('./db/productsDb.json')
const productsValidators = new ProductsValidators(productManager.getProducts())

//products router
productsRouter.get('', async (req, res) => {
    const status = await productsValidators.logicQuery(req.query)
    if (status === 'approved') { return res.json(await productManager.getProducts())}
    res.json(status)
})

productsRouter.get('/:id', async (req, res) => {
    res.json(await productsValidators.prodIdValidate(req.params.id))
})

productsRouter.post('', async (req, res) => {
    const status = await productsValidators.validatorAdd(req.body);
    if (status === 'approved'){ return res.json(await productManager.getAddProducts(req.body))};
    res.json(status)
})

productsRouter.put('/:id', async (req, res) => {
    const status = await productsValidators.validatorUpdate(req.params.id, req.body)
    if (status === 'approved') { return res.json(await productManager.getProductUp(req.params.id, req.body))}
    res.json(status)
})

productsRouter.delete('/:id', async (req, res) => {
    const status = await productsValidators.prodDeleteValidate(req.params.id)
    if (status === 'approved') { return res.json(await productManager.getDeleteProduct(req.params.id))}
    res.json(status)
})

//export router
export default productsRouter