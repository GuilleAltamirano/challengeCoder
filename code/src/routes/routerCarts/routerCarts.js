import { Router } from "express";
import { CartsManager } from "../../manager/carts/cartManager.js";
import { CartsValidators } from "../../manager/carts/cartsValidators.js";

//variables
const cartsRouter = new Router()
const cartsManager = new CartsManager('./db/cartsDb.json')
const cartsValidators = new CartsValidators(cartsManager.getCart())

//carts router
cartsRouter.post('', async (req, res) => {
    const status = await cartsValidators.cartsVer()
    if ( status === 'success') { return  res.send(await cartsManager.getCreateCart())}
    console.log(status)
    res.json(status)
})

cartsRouter.get('/:id', async (req, res) => {
    const status = await cartsValidators.idVerificator(req.params.id)
    if (status === 'success'){ return res.send (await cartsManager.getCartId(req.params.id))}
    res.send(status)
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const status = await cartsValidators.addVerificator(req.params.cid, req.params.pid)
    res.send(status)
    // res.send( await cartsManager.addProduct(req.params.cid, req.params.pid))
})

export default cartsRouter