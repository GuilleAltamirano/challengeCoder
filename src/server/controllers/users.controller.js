import { usersServices } from "../services/Users.service.js"
import { sendEmailValidation } from "../utils/nodemailer.js"

export const postUsersController = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const code = Math.random().toString(36).substring(2, 18)
        const newUser = await usersServices.post({ first_name, last_name, email, age, password })
        const sendEmailVerify = await sendEmailValidation({receiver: email, code})
        const date = {code, email}
        res.cookieAuthEmail(date)
    } catch (err) {next(err)}
}

export const putUsersController = async (req, res, next) => {
    try {
        const uid = req.uid
        const update = req.body
        const test = await usersServices.put({uid, update})
        
        res.jsonMessage('User updated')
    } catch (err) {next(err)}
}

export const putNewPasswordController = async (req, res, next) => {
    try {
        const id = req.uid
        const password = req.body.password

        const services = await usersServices.newPassword({_id: id, password, email: req.user.user.email})

        res.redirectPage('/login')
    } catch (err) {next(err)}
}

export const putRoleController = async (req, res, next) => {
    try {
        const uid = req.uid
        const data = await usersServices.challengeRole({uid})

        res.jsonMessage('User updated')
    } catch (err) {next(err)}
}