import { isValidObjectId } from "mongoose"
import { postUsersController, putUsersController } from "../controllers/users.controller.js"
import Routers from "./router.js"
import { ApiError } from "../errors/Api.error.js"
import { usersValidation } from "../validations/joiUsers.validation.js"

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
        this.post('/', ['ADMIN'], await usersValidation('post'), postUsersController)
        this.put('/:uid', ['ADMIN'], await usersValidation('put'), putUsersController)
    }
}

export const usersRoute = new UsersRouter()