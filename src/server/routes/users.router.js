import { isValidObjectId } from "mongoose"
import { postUsersController, putNewPasswordController, putRoleController, postUploadsDocumentsController } from "../controllers/users.controller.js"
import Routers from "./router.js"
import { ApiError } from "../errors/Api.error.js"
import { usersValidation } from "../validations/joiUsers.validation.js"
import { uploadDocuments } from "../utils/multer.js"

class UsersRouter extends Routers {
    constructor () {
        super()
        this.router.param('uid', async (req, res, next, uid) => {
            try {
                if (!isValidObjectId(uid)) throw new ApiError('Param invalid', 400)
                req.uid = uid
                next()
            } catch (err) {next(err)}
        })
    }

    async init(){
        this.post('/register', ['PUBLIC'], await usersValidation('post'), postUsersController)
        this.post('/:uid/documents', ['USER', 'PREMIUM', 'ADMIN'], uploadDocuments, postUploadsDocumentsController)

        this.put('/newPassword/:uid', ['USER', 'PREMIUM'], putNewPasswordController)
        this.put('/premium/:uid', ['USER', 'PREMIUM'], putRoleController)
    }
}

export const usersRoute = new UsersRouter()