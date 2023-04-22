import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { productsServices } from "../../../daos/mongoDb/services/products.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"

export const putUpQuantityValidator = async (cid, pid, qty) => {
    //exist cart?
    const cart = await cartsServices.cartsById(cid)
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //exist product?
    const prod = await productsServices.getProductById(pid)
    if (!prod) {throw new ApiError(`product id: ${pid} doesn't exist`, 404)}
    //exist product in cart?
    const products = cart.products
    const existProd = products.find(i => i.product.equals(pid))
    if (!existProd) {throw new ApiError(`product id: ${pid} doesn't exist in cart`, 404)}
    //req.body is quantity?
    const key = Object.keys(qty)
    const validation = {
        title: key.length === 1 && key[0] === 'quantity',
        value: typeof qty.quantity === 'number'
    }
    if (!validation.title || !validation.value) {throw new ApiError(`Value joined is invalid`, 404)}
    //update
    existProd.quantity = qty.quantity
    const update = await cartsServices.addProductCart({_id: cid}, {products: products})
    // return 
    return update
}