import { getIdProductsValidator } from "../validators/products/getIdProducts.validators.js"

export const getIdProductsControllers = async (req, res, next) => {
    try {
        //var
        const pid = req.params.pid
        const verification = await getIdProductsValidator(pid)
        //return
        res.status(200).json({
            status: true,
            payloads: verification
        })
    } catch (err) {next(err)}
}