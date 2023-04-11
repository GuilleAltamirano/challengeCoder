import { __dirname } from "../../utils/utils.js"

export const multerProductsControllers = async (req, res, next) => {
    try {
        //var
        const file = req.file
        const urlImage = `/uploads/${file.filename}`
        //return
        res.status(200).json({
            status: true,
            payload: urlImage
        })
    } catch (err) {next(err)}
}