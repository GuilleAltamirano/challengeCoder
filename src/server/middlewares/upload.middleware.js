import { ApiError } from "../errors/Api.error.js"
import { upload } from "../utils/multer.js"

export const uploadDocuments = async (req, res, next) => {
    upload.fields([
        { name: 'identification', maxCount: 1 },
        { name: 'address', maxCount: 1 },
        { name: 'account_status', maxCount: 1 },
        { name: 'profile', maxCount: 1 }
    ]) (req, res, (error) => {
        const err = new ApiError('Upload invalid', 400)
        next(err)
    })
}