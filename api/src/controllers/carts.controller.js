import { cartsServices } from "../daos/services/Carts.services.js"
import { existCart, postProdInCartValidation, existProd } from "../validations/carts.validation.js"

export const getCartsController = async (req, res, next) => {
    try {
        const carts = await cartsServices.getCarts()

        res.status(200).json({
            status: 'success',
            payload: carts
        })
    } catch (err) {next(err)}
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const { products } = await existCart(cid)

        res.status(200).json({
            status: 'success',
            payload: products
        })
    } catch (err) {next(err)}
}

export const postCarts = async (req, res, next) => {
    try {
        const existCartEmpty = await cartsServices.getCarts({products: {$size: 0}})
        const cart = existCartEmpty[0].products.length === 0 ? existCartEmpty : await cartsServices.postCart()

        res.status(200).json({
            status: 'success',
            payload: cart
        })
    } catch (err) {next(err)}
}

export const postProdInCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const { products } = await existCart(cid)
        const prod = await existProd(pid) //valid product existence

        const existProdInCart = products.find(products => products.product._id.equals(pid))//valid product existence in cart
        const updated = await postProdInCartValidation({existProdInCart, prod, products, cid})

        res.status(200).json({
            status: 'success',
            payload: updated
        })
    } catch (err) {next(err)}
}

export const putCartController = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const cart = await existCart(cid)
        const products = req.body.products ?? [] //[] is for remove all
        
        const updated = await cartsServices.putCart({_id: cid}, {products: products})

        res.status(200).json({
            status: 'success',
            payload: updated
        })
    } catch (err) {next(err)}
}

export const putQuantityProds = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const qty = req.body
        const { products } = await existCart(cid)
        const prod = await existProd(pid)
        const existProdInCart = products.find(i => i.product._id.equals(pid))
        
        existProdInCart.quantity = qty.quantity

        const updated = await cartsServices.putCart({_id: cid}, {products: products})
        
        res.status(200).json({
            status: 'success',
            payload: updated
        })
    } catch (err) {next(err)}
}

export const delProdInCart = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const prod = await existProd(pid)
        const { products } = await existCart(cid)

        const upProds = products.filter(prod => !prod.product.equals(pid))
        const updated = await cartsServices.putCart({_id: cid}, {products: upProds})

        res.status(200).json({
            status: 'success',
            payload: updated
        })
    } catch (err) {next(err)}
}