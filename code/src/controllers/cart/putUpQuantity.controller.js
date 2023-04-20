import { putUpQuantityValidator } from "../validators/cart/putUpQuantity.validator.js"

export const putUpQuantityController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body
        const validator = await putUpQuantityValidator(cid, pid, quantity)
        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}