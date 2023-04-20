import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { productsServices } from "../../../daos/mongoDb/services/products.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"


export const deleteProdInCartValidator = async (cid, pid) => {
    //exist cart?
    const cart = await cartsServices.cartsById(cid)
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //exist product?
    const prod = await productsServices.getProductById(pid)
    if (!prod) {throw new ApiError(`product id: ${pid} doesn't exist`, 404)}
    //product the cart
    const products = cart.products
    //exist Product?
    const existProd = products.find(prod => prod.product.equals(pid))
    if (!existProd) {throw new ApiError(`product id: ${pid} doesn't exist in cart`, 404)}
    //filter prods in cart
    const filterProd = products.filter(prod => !prod.product.equals(pid))
    //return
    const updated = await cartsServices.deleteProdInCart({"_id": cid}, {"products": filterProd})
    return updated
}        