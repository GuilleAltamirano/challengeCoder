import { getProductsValidator } from "../validators/products/getProducts.validator.js"

export const getProductsController = async (req, res, next) => {
    try {
        //var
        const query = req.query
        const validator = await getProductsValidator(query)

        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}