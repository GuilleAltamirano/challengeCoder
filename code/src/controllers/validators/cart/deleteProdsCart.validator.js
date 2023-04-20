import { ApiError } from "../../../errors/ApiError.errors.js"
import { cartsServices } from "../../../daos/mongoDb/services/Carts.services.js"

export const deleteProdsCartValidator = async (cid) => {
    //exist cart?
    const cart = await cartsServices.cartsById(cid)
    if (!cart) {throw new ApiError(`cart id ${cid} doesn't exist`, 404)}
    //return
    const update = await cartsServices.deleteProdInCart({"_id": cid}, {"products": []})
    return update
}