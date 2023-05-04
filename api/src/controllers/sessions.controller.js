import { userServices } from "../daos/services/Users.services.js"
import { ApiError } from "../errors/Api.error.js"
import { registerValidation } from "../validations/sessions.validation.js"

export const loginController = async (req, res, next) => {
    try {
        const { emailAddress, password } = req.body
        let existUser = await userServices.getUsers({emailAddress});
        existUser[0] = existUser.length === 0 ? {fullname: undefined} : {fullname: `${existUser[0].firstname} ${existUser[0].lastname}`};        
        const user = emailAddress === process.env.EMAIL && password === process.env.PASSWORD ?
        {fullname: 'admin', role: 'admin'} : {fullname: existUser[0].fullname, role: 'user'}

        if (!user.fullname) {throw new ApiError(`User or password invalid`, 400)}

        req.session.name = user.fullname
        req.session.email = emailAddress
        req.session.role = user.role

        res.redirect(302, '/')
    } catch (err) {next(err)}
}

export const registerController = async (req, res, next) => {
    try {
        const newUser = req.body
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