import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { productsServices } from "../../../daos/mongoDb/services/products.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"


export const postProductCartValidator = async (cid, pid) => {
    //exist cart?
    const cart = await cartsServices.cartsById(cid)
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //exist product?
    const prod = await productsServices.getProductById(pid)
    if (!prod) {throw new ApiError(`product id: ${pid} doesn't exist`, 404)}
    //product the cart
    const products = cart.products
    //exist Product?
    const existProd = products.find(prod => prod.product === pid)
    if (!existProd){
        const addProd = {product: prod.id, quantity: 1}
        products.push(addProd)
        const updated = await cartsServices.addProductCart({"_id": cid}, {"products": products})
        return updated
    }
    //there is stock?
    if (existProd.quantity >= prod.stock) {throw new ApiError(`Stock product:${pid} is small to quantity ${existProd.quantity}`, 404)}
    //add ok
    existProd.quantity += 1
    //return
    const updated = await cartsServices.addProductCart({"_id": cid}, {"products": products})
    return updated
}        