import { Router } from "express";
import { CartsManager } from "../daos/carts/cartManager.js";
import { CartsValidators } from "../daos/carts/cartsValidators.js";

//variables
const cartsRouter = new Router()
const cartsManager = new CartsManager('./src/db/cartsDb.json')
const cartsValidators = new CartsValidators(cartsManager.getCart())

//carts router
cartsRouter.post('', async (req, res) => {
    const status = await cartsValidators.cartsVer()
    if ( status === 'success') { return  res.status(201).json(await cartsManager.getCreateCart())}
    res.status(400).json(status)
})

cartsRouter.get('/:id', async (req, res) => {
    const status = await cartsValidators.idVerificator(req.params.id)
    if (status === 'success'){ return res.status(202).json (await cartsManager.getCartId(req.params.id))}
    res.status(400).json(status)
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const status = await cartsValidators.addVerificator(req.params.cid, req.params.pid)
    if (status === 'success') {return res.status(201).json( await cartsManager.addProduct(req.params.cid, req.params.pid))}
    res.status(400).json(status)
})

export default cartsRouter