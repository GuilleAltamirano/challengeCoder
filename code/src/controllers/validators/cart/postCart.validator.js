import { ApiError } from "../../../errors/ApiError.errors.js"
import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"

export const postCartValidator = async () => {
    //exist products
    const cart = await cartsServices.getCarts({ products: { $size: 0 } })
    if(cart.length !== 0){throw new ApiError('There is already an empty cart', 406)}
    //create cart
    const newCart = await cartsServices.createCart()
    //return new cart
    return newCart
}
