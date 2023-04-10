import { postCartValidator } from "../validators/cart/postCart.validator.js"

export const postCartController = async (req, res, next) => {
    try {
        //var and verification
        const validator = await postCartValidator()
        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}