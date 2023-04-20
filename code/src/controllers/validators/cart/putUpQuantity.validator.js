import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { productsServices } from "../../../daos/mongoDb/services/products.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"

export const putUpQuantityValidator = async (cid, pid, quantity) => {
//exist cart?
    const cart = await cartsServices.cartsById(cid)
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //exist product?
    const prod = await productsServices.getProductById(pid)
    if (!prod) {throw new ApiError(`product id: ${pid} doesn't exist`, 404)}
    //req.body is quantity?
    const qty = {
        title: Object.keys(quantity) === [ 'quantity' ],
        value: typeof quantity.quantity === 'number'
    }
    console.log(qty.title);
    if (!qty.title || !qty.value) {throw new ApiError(`Value joined is invalid`, 404)}
    //return
    return {
        'cid': cid,
        'pid': pid,
        'quantity': quantity
    }
}