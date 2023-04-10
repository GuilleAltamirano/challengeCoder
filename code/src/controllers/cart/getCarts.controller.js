import { cartsServices } from "../../daos/services/Carts.services.js"

export const getCartsController = async (req, res, next) => {
    res.status(200).json({
        status: true,
        payload: await cartsServices.getCarts()
    })
}