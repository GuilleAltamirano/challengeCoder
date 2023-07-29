import { isValidObjectId } from "mongoose"
import { getUsersPaginateController, postUsersController, putNewPasswordController, putRoleController, postUploadsDocumentsController, deleteUsersController } from "../controllers/users.controller.js"
import Routers from "./router.js"
import { ApiError } from "../errors/Api.error.js"
import { usersValidation } from "../middlewares/usersValidation.middleware.js"
import { uploadDocuments } from "../middlewares/upload.middleware.js"

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
        this.get('/', ['ADMIN'], getUsersPaginateController)

        this.post('/register', ['PUBLIC'], await usersValidation('post'), postUsersController)
        this.post('/:uid/documents', ['USER', 'PREMIUM', 'ADMIN'], uploadDocuments, postUploadsDocumentsController)

        this.put('/newPassword/:uid', ['USER', 'PREMIUM'], putNewPasswordController)
        this.put('/premium/:uid', ['USER', 'PREMIUM'], putRoleController)

        this.delete('/', ['ADMIN'], deleteUsersController)
    }
}

export const usersRoute = new UsersRouter()