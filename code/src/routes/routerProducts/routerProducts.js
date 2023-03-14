import { Router } from "express"
import { ProductManager } from "../../manager/products/productManager.js"
import { ProductsValidators } from "../../manager/products/productsValidators.js"

//variables
const productsRouter = new Router()
const productManager = new ProductManager('./db/productsDb.json')
const productsValidators = new ProductsValidators(productManager.getProducts())

//products router
productsRouter.get('', async (req, res) => {
    const ok = await productsValidators.logicQuery(req.query)
    if (ok === 'approved') { return res.json(await productManager.getProducts())}
    res.json(ok)
})

productsRouter.get('/:id', async (req, res) => {
    const idSearch = req.params.id;
    const result = await productsValidators.prodIdValidate(idSearch)
    res.json(result)
})

productsRouter.post('', async (req, res) => {
    const ok = await productsValidators.validatorAdd(req.body);
    if (ok === 'approved'){ return res.json(await productManager.getAddProducts(req.body))};
    res.json(ok)
})

productsRouter.put('/:id', async (req, res) => {
    const ok = await productsValidators.validatorUpdate(req.params.id, req.body)
    if (ok === 'approved') { return res.json(await productManager.getProductUp(req.params.id, req.body))}
    res.json(ok)
})

productsRouter.delete('/:id', async (req, res) => {
    const ok = await productsValidators.prodDeleteValidate(req.params.id)
    if (ok === 'approved') { return res.json(await productManager.getDeleteProduct(req.params.id))}
    res.json(ok)
})

//export router
export default productsRouter