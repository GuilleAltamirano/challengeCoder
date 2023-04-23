import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"

export const putUpProdValidator = async (cid, prods) => {
    console.log(prods);
    //exist cart?
    const cart = await cartsServices.getCarts({_id: cid})
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //req.body is quantity?
    const key = Object.keys(prods)
    const ver = {
        title: key.length === 1 && key[0] === 'products',
        value: Array.isArray(prods.products)
    }
    if (!ver.title || !ver.value) {throw new ApiError(`Value joined is invalid`, 404)}
    //update products
    const update = await cartsServices.addProductCart({_id: cid},{products: prods.products})
    //return product update message
    return update
}