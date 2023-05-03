import { Router } from "express"
import { upload } from "../utils/multer.js"

const router = new Router()


router.post('/', upload.single('file'), async (req, res, next) => {
    try {
        const file = req.file
        if (!file) return res.status(201).json({status: false}) //to use link thumbnails

        let urlImage = `/uploads/${file.filename}`

        res.status(200).json({
            status: true,
            payload: urlImage
        })
    } catch (err) {next(err)}
})

export default router