import { cartsServices } from "../../daos/mongoDb/services/Carts.services.js"

export const getCartsController = async (req, res, next) => {
    try {
        res.status(200).json({
            status: true,
            payload: await cartsServices.getCarts()
        })
    } catch (err) {next(err)}
}