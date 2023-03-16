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
    if (status === 'approved') { return res.status(200).json(await productManager.getProducts())}
    res.status(404).json(status)
})

productsRouter.get('/:id', async (req, res) => {
    const status = await productsValidators.prodIdValidate(req.params.id)
    if (status === 'approved'){ return res.status(202).json( await productManager.getProductById(req.params.id)) }
    res.status(406).json(status)
})

productsRouter.post('', async (req, res) => {
    const status = await productsValidators.validatorAdd(req.body);
    if (status === 'approved'){ return res.status(201).json(await productManager.getAddProducts(req.body))};
    res.status(400).json(status)
})

productsRouter.put('/:id', async (req, res) => {
    const status = await productsValidators.validatorUpdate(req.params.id, req.body)
    if (status === 'approved') { return res.status(202).json(await productManager.getProductUp(req.params.id, req.body))}
    res.status(406).json(status)
})

productsRouter.delete('/:id', async (req, res) => {
    const status = await productsValidators.prodDeleteValidate(req.params.id)
    if (status === 'approved') { return res.status(202).json(await productManager.getDeleteProduct(req.params.id))}
    res.status(400).json(status)
})

//export router
export default productsRouter