import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { upload } from "../utils/multer.js"

const {UPLOAD_DOCUMENT_ONE, UPLOAD_DOCUMENT_TWO, UPLOAD_DOCUMENT_THREE, UPLOAD_PHOTO_USER, UPLOAD_IMAGE_PRODUCTS} = varsEnv

export const uploadDocuments = async (req, res, next) => {
    upload.fields([
        { name: UPLOAD_DOCUMENT_ONE, maxCount: 1 },
        { name: UPLOAD_DOCUMENT_TWO, maxCount: 1 },
        { name: UPLOAD_DOCUMENT_THREE, maxCount: 1 },
        { name: UPLOAD_PHOTO_USER, maxCount: 1 }
    ]) (req, res, (error) => {
        const err = new ApiError('Upload invalid', 400)
        next(err)
    })
}

export const uploadThumbnails = async (req, res, next) => {
    upload.array(UPLOAD_IMAGE_PRODUCTS, 5) (req, res, (error) => {
        next(error)
    })
}