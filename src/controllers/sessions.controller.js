import { generateToken } from "../config/passport.config.js"
import { usersDao } from "../dao/factory.dao.js"
import { sessionsServices } from "../services/Sessions.service.js"

export const cookieExtractor = req  => {
    let token = null
    if (req.signedCookies && req) {
        token = req.signedCookies['cookieToken']
    }
    return token
}

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const data = await sessionsServices.login({email, password})
        const token = await generateToken(data)

        res.cookieSession(token)
    } catch (err) {next(err)}
}

export const emailsValidationController = async (req, res, next) => {
    try {
        const {code} = req.body
        const cookie = req.signedCookies['cookieAuthEmail']
        const codeValid = await sessionsServices.codeValid({code, cookie})

        res.redirectPage('/')
    } catch (err) {next(err)}
}