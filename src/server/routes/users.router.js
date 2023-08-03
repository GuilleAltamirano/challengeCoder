import { isValidObjectId } from "mongoose"
import { getUsersPaginateController, postUsersController, putNewPasswordController, putRoleController, postUploadsDocumentsController, deleteUsersController } from "../controllers/users.controller.js"
import Routers from "./router.js"
import { ApiError } from "../errors/Api.error.js"
import { usersValidation } from "../middlewares/usersValidation.middleware.js"
import { uploadDocuments } from "../middlewares/upload.middleware.js"
import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED, ROLE_USER_BASIC, ROLE_PUBLIC} = varsEnv

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
        this.get('/', [SUPERIOR_PRIVILEGES], getUsersPaginateController)

        this.post('/register', [ROLE_PUBLIC], await usersValidation('post'), postUsersController)
        this.post('/:uid/documents', [ROLE_USER_BASIC, ROLE_USER_ADVANCED, SUPERIOR_PRIVILEGES], uploadDocuments, postUploadsDocumentsController)

        this.put('/newPassword/:uid', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], putNewPasswordController)
        this.put('/premium/:uid', [ROLE_USER_BASIC, ROLE_USER_ADVANCED], putRoleController)

        this.delete('/', [SUPERIOR_PRIVILEGES], deleteUsersController)
    }
}

export const usersRoute = new UsersRouter()