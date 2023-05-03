import {ApiError} from '../errors/Api.error.js'
import { cartsServices } from '../daos/services/Carts.services.js'
import { productsServices } from '../daos/services/Products.services.js'
import { isValidObjectId } from 'mongoose'

export const postProdInCartValidation = async (data) => {
    const {existProdInCart, prod, products, cid} = data

    if (!existProdInCart){
        const addProd = {product: prod._id, quantity: 1}
        products.push(addProd)
        const updated = await cartsServices.putCart({"_id": cid}, {"products": products})
        return updated
    }

    if (existProdInCart.quantity >= prod.stock) {throw new ApiError(`Stock product is small to quantity`, 404)}

    existProdInCart.quantity += 1
    const updated = await cartsServices.putCart({"_id": cid}, {"products": products})
    
    return updated
}

export const existCart = async (cid) => {
    if (!isValidObjectId(cid)) {throw new ApiError('id cart invalid')}
    let cart = await cartsServices.getCarts({_id: cid})
    if (!cart) {throw new ApiError(`cart or product invalid`, 404)}
    cart = cart[0]
    const products = cart.products
    return {cart, products}
}

export const existProd = async (pid) => {
    if (!isValidObjectId(pid)){throw new ApiError('id product invalid')}
    let prod = await productsServices.getProducts({_id: pid})
    if (!prod) {throw new ApiError(`cart or product invalid`, 404)}
    prod = prod[0]

    return prod
}

