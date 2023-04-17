import { productsServices } from "../../daos/mongoDb/services/Products.services.js"

export const getProductsController = async (req, res, next) => {
    try {
        res.status(200).json({
            status: true,
            payload: await productsServices.productsPaginate({})
        })
    } catch (err) {next(err)}
}