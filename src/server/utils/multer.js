import multer from "multer"
import { __dirname } from "./utils.js"
import { ApiError } from "../errors/Api.error.js"
import fs from 'fs'
import varsEnv from "../env/vars.env.js"

const {UPLOAD_DOCUMENT_ONE, UPLOAD_DOCUMENT_TWO, UPLOAD_DOCUMENT_THREE, UPLOAD_PHOTO_USER, UPLOAD_IMAGE_PRODUCTS} = varsEnv


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.user.user.fullname
        const [first_name, last_name] = user.split(' ')
        const fullname = first_name + '_' + last_name
        const [code, index] = file.originalname.split('_')

        if (file.fieldname === UPLOAD_DOCUMENT_ONE || file.fieldname === UPLOAD_DOCUMENT_TWO || file.fieldname === UPLOAD_DOCUMENT_THREE) {
            createFolderForUser(__dirname + `/uploads/documents/${fullname}`)
            return cb(null, __dirname + `/uploads/documents/${fullname}`)
        }
        if (file.fieldname === UPLOAD_PHOTO_USER){
            createFolderForUser(__dirname + `../../../public/uploads/profile/${fullname}`)
            return cb(null, __dirname + `../../../public/uploads/profile/${fullname}`)
        }
        if (file.fieldname === UPLOAD_IMAGE_PRODUCTS) {
            createFolderForUser(__dirname + `../../../public/uploads/products/${code}`)
            return cb(null, __dirname + `../../../public/uploads/products/${code}`)
        }
        cb(new ApiError('Fieldname invalid', 400), null)
    },
    filename: function (req, file, cb) {
        const [typeFile, extension] = file.mimetype.split('/')

        if (file.fieldname === UPLOAD_DOCUMENT_ONE || file.fieldname === UPLOAD_DOCUMENT_TWO || file.fieldname === UPLOAD_DOCUMENT_THREE || file.fieldname === UPLOAD_PHOTO_USER) {
            return cb(null, `${file.originalname}.${extension}`)
        }

        if (file.fieldname === UPLOAD_IMAGE_PRODUCTS && req.files.length > 0) {
            return cb(null, `${file.originalname}.${extension}`)
        }

        return cb(new ApiError(`Invalid file`, 400))
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 Mb
    onError: (error, next) => {
        const err = new ApiError('Upload incomplete', 400)
        next(err)
    },
    fileFilter: (req, file, callback) => {
        let acceptableExtensions = []
        
        if (file.fieldname === UPLOAD_DOCUMENT_ONE || file.fieldname === UPLOAD_DOCUMENT_TWO || file.fieldname === UPLOAD_DOCUMENT_THREE) {
            acceptableExtensions = ['png', 'jpg', 'jpeg', 'pdf']
        }  
        if (file.fieldname === UPLOAD_PHOTO_USER || file.fieldname === UPLOAD_IMAGE_PRODUCTS) {
            acceptableExtensions = ['image/png', 'image/jpg', 'image/jpeg']
        }

        if (!acceptableExtensions.includes(file.mimetype)) {
            return callback(new ApiError(`Extension not allowed, extensions accepted are ${acceptableExtensions.join(',')} in ${file.fieldname}`, 400))
        }
        
        callback(null, true)
    }
})

const createFolderForUser = (folder) => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true})
    return
}
