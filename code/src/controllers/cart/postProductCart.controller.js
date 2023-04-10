import { postProductCartValidator } from '../validators/cart/postProductCart.validator.js'

export const postProductCartController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const pid = req.params.pid
        //validations 
        const validation = await postProductCartValidator(cid, pid)
        //return
        res.status(200).json({
            status: true,
            payload: validation
        })
    } catch (err) {next(err)}
}