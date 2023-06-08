import Routers from "./router.js"
import { upload } from "../utils/multer.js"

class UploadsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.post('/img', ['PUBLIC'], upload.single('file'), async (req, res) => {
            
        })
    }
}

// router.post('/', upload.single('file'), async (req, res, next) => {
//     try {
//         const file = req.file
//         if (!file) return res.status(201).json({status: false}) //to use link thumbnails

//         let urlImage = `/uploads/${file.filename}`

//         res.status(200).json({
//             status: true,
//             payload: urlImage
//         })
//     } catch (err) {next(err)}
// })

// export default router