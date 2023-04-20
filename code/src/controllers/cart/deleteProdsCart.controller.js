import { deleteProdsCartValidator } from "../validators/cart/deleteProdsCart.validator.js"

export const deleteProdsCartController = async (req, res, next) => {
    try {
        //var
        const cid = req.params.cid
        const validator = await deleteProdsCartValidator(cid)
        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}