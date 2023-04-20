import { deleteProdInCartValidator } from "../validators/cart/deleteProdInCart.validator.js"

export const deleteProdInCartController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const pid = req.params.pid
        const validator = await deleteProdInCartValidator(cid, pid)
        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}