import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"

export const getCartIdValidator = async (cid) => {
    try {
        
        //exist cart?
        const cart = await cartsServices.getCarts({_id: cid})
        return cart[0].products
    
    } catch (err) {throw new ApiError(`The type id ${cid} is not valid`, 404)}
}