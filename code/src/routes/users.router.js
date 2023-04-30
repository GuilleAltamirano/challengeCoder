import { Router } from "express"
import { getUsersValidator } from "../controllers/validators/users/getUser.validator.js"

const router = new Router()

router.get('/:user/:password', async (req, res, next) => {
    try {
        //vars
        const email = req.params.user
        const password = req.params.password
        const validator = await getUsersValidator(email, password)

        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
})

router.post('/', async (req, res, next) => {
    try {
        //vars
        const user = req.body
        const {surname, lastname, emailAddress, password} = user
        if (!surname || !lastname || !emailAddress || !password) {throw new ApiError('keys or value invalid', 400)}
        const existUser = await userServices.getUsers({emailAddress})

        if (existUser.length > 0) {throw new ApiError(`user exist`, 400)}

        const newUser = await userServices.postUser(user)

        res.status(200).json({
            status: true,
            payload: newUser
        })
    } catch (err) {next(err)}
})

export default router