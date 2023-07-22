import multer from "multer"
import { __dirname } from "./utils.js"
import path from "path"
import { ApiError } from "../errors/Api.error.js"
import fs from 'fs'


export const uploadDocuments = async (req, res, next) => {
    upload.fields([
        { name: 'identification', maxCount: 1 },
        { name: 'address', maxCount: 1 },
        { name: 'account_status', maxCount: 1 },
        { name: 'profile', maxCount: 1 }
    ]) (req, res, (err) => {
        if (err) return next(new ApiError('Upload invalid', 400))
        next()
    })
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const user = req.user.user.fullname
        const [first_name, last_name] = user.split(' ')
        const fullname = first_name + '_' + last_name

        if (file.fieldname === 'identification' || file.fieldname === 'address' || file.fieldname === 'account_status') {
            createFolderForUser(__dirname + `/uploads/documents/${fullname}`)
            return cb(null, __dirname + `/uploads/documents/${fullname}`)
        }
        if (file.fieldname === 'profile'){
            createFolderForUser(__dirname + `../../../public/uploads/profile/${fullname}`)
            return cb(null, __dirname + `../../../public/uploads/profile/${fullname}`)
        }
        if (file.fieldname === 'img_products') {
            createFolderForUser(__dirname + `../../../public/uploads/products/${fullname}`)
            return cb(null, __dirname + `../../../public/uploads/products/${fullname}`)
        }
        cb(new ApiError('Fieldname invalid', 400), null)
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase()
        if (file.fieldname === 'identification' || file.fieldname === 'address' || file.fieldname === 'account_status' || file.fieldname === 'profile') return cb(null, file.fieldname + extension)
        if (file.fieldname === img_products && req.files.img_products <= 0) for (let i = 0; i < req.files.length; i++) {
            return cb(null, `${file.fieldname}_${i}${extension}`)
        }
        return cb(new ApiError(`Invalid file`, 400))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb
    fileFilter: (req, file, callback) => {
        let acceptableExtensions = []
        if (file.fieldname === 'identification' || file.fieldname === 'address' || file.fieldname === 'account_status') acceptableExtensions = ['png', 'jpg', 'jpeg', 'pdf']
        if (file.fieldname === 'profile' || file.fieldname === 'img_products') acceptableExtensions = ['png', 'jpg']
        //extensions ok?        
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new ApiError(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')} in ${file.fieldname}`, 400))
        }
        callback(null, true)
    }
})

const createFolderForUser = (folder) => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true})
    return
}
