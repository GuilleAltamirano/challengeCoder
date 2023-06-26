import { ApiError } from "../errors/Api.error.js"
import { createFakerProducts } from "../utils/facker.js"

export const mockingProductsController = async (req, res, next) => {
    try {
        let productsFake = []
        for (let i = 0; i < 51; i++) {
            productsFake.push(await createFakerProducts())
        }

        res.jsonSuccess(productsFake)
    } catch (err) {next(err)}
}

export const loggerController = async (req, res, next) => {
    try {
        throw new ApiError('este es endpoint para probar un error', 500)
    } catch (err) {next(err)}
}