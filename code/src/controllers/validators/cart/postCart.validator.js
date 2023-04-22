import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"

export const postCartValidator = async () => {
    //exist products
    const cart = await cartsServices.getCarts({ products: { $size: 0 } })
    if(cart.length !== 0){return cart}
    //create cart
    const newCart = await cartsServices.createCart()
    //return new cart
    return newCart
}
