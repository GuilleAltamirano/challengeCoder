import { getCartIdValidator } from "../validators/cart/getCartId.validator.js"

export const getCartIdController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const verification = await getCartIdValidator(cid)
        //return
        res.status(200).json({
            status: true,
            payload: verification
        })
    } catch (err) {next(err)}
}