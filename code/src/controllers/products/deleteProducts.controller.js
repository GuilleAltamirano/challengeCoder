import { deleteProductsValidators } from "../validators/products/deleteProducts.validators.js"

export const deleteProductsControllers = async (req, res, next) => {
    try {
        //var
        const pid = req.params.pid
        const validation = await deleteProductsValidators(pid)
        //return
        res.status(200).json({
            status: true,
            payload: validation
        })
    } catch (err) {next(err)}
}