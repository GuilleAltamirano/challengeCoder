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