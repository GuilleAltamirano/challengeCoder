import { putUpProdValidator } from "../validators/cart/putUpProd.validator.js"

export const putUpProdController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const prods = req.body
        const verification = await putUpProdValidator(cid, prods)

        res.status(200).json({
            status: true,
            payload: verification
        })
    } catch (err) {next(err)}
}