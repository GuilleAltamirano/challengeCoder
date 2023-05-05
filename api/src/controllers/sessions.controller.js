import { userServices } from "../daos/services/Users.services.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import { registerValidation } from "../validations/sessions.validation.js"

export const loginController = async (req, res, next) => {
    try {
        const { emailAddress, password } = req.body
        let existUser = await userServices.getUsers({emailAddress});

        if (emailAddress === process.env.EMAIL && password === process.env.PASSWORD) {
            req.session.name = 'Admin'
            req.session.email = emailAddress
            req.session.role = 'admin'
            return res.redirect(302, '/')
        }
        if (existUser.length === 0) {throw new ApiError(`User or password invalid`, 400)}
        if (!isValidPassword(existUser[0],password)) {throw new ApiError(`User or password invalid`, 400)}

        req.session.name = `${existUser[0].firstname} ${existUser[0].lastname}` 
        req.session.email = emailAddress
        req.session.role = 'user'

        res.redirect(302, '/')
    } catch (err) {next(err)}
}

export const registerController = async (req, res, next) => {
    try {
        const {firstname, lastname, emailAddress, password} = req.body
        const newUser = {
            firstname, lastname, emailAddress,
            password: createHash(password)
        }
        const addUser = await registerValidation(newUser)

        res.redirect(302, '/login')
    } catch (err) {next(err)}
}

export const logoutController = async (req, res, next) => {
    try {
        //var
        req.session.destroy( err => {
            if (!err) {
                return res.status(307).redirect('/login')
            }
            res.status(400).json({
                status: false,
                payload: 'Logout Error'
            })
        })
    } catch (err) {next(err)}
}