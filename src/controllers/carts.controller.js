import { ApiError } from "../errors/Api.error.js"
import { cartsServices } from "../services/carts.service.js"
import { productServices } from "../services/Products.service.js"

export const getCartsController = async (req, res, next) => {
    try {
        const { page=1, limit=10, product, sort } = req.query
        const {docs, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage} = await cartsServices.paginate({ page, limit, product, sort })

        res.jsonSuccess({docs, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage})
    } catch (err) {next(err)}
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const cid = req.cid
        const cart = await cartsServices.get({_id: cid})

        res.json({payload: cart})
    } catch (err) {next(err)}
}

export const postCarts = async (req, res, next) => {
    try {
        const newCart = await cartsServices.post()

        res.jsonSuccess(newCart)
    } catch (err) {next(err)}
}

export const postProdInCartController = async (req, res, next) => {
    try {
        const cid = req.cid
        const pid = req.pid
        const prod = await productServices.get({_id: pid}) //valid product existence
        if (!prod[0].status) throw new ApiError('Product invalid', 400)
        const updated = await cartsServices.postProdInCart({cid, prod})

        res.jsonSuccess(updated)
    } catch (err) {next(err)}
}

export const postPurchaseController = async (req, res, next) => {
    try {
        const cid = req.cid
        const {ticket, refuseProducts} = await cartsServices.postPurchase(cid)
        const payload = {
            successful_purchase: ticket,
            failed_purchase: refuseProducts
        }

        res.jsonSuccess(payload)
    } catch (err) {next(err)}
}

export const putCartController = async (req, res, next) => {
    try {
        const cid = req.cid
        const cart = await cartsServices.get({_id: cid})
        const newProds = req.body.products ?? [] //[] is for remove all
        const updated = await cartsServices.put({_id: cid, products: newProds})

        res.jsonSuccess(newProds)
    } catch (err) {next(err)}
}

export const putQuantityProds = async (req, res, next) => {
    try {
        const cid = req.cid
        const pid = req.pid
        const qty = req.body.quantity
        const prod = await productServices.get({_id: pid}) //valid product existence
        
        if (prod[0].stock < qty || !prod[0].status) throw new ApiError('Quantity invalid', 400)
        
        const updated = await cartsServices.putQtyProd({cid, pid, qty})

        res.jsonSuccess(updated)
    } catch (err) {next(err)}
}

export const delProdInCart = async (req, res, next) => {
    try {
        const cid = req.cid
        const pid = req.pid
        const prod = await productServices.get({_id: pid}) //valid product existence

        const updated = await cartsServices.delProdInCart({cid, pid})

        res.jsonSuccess(updated)
    } catch (err) {next(err)}
}