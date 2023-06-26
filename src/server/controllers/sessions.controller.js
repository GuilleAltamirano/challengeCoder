import { generateToken } from "../config/passport.config.js"
import { sessionsServices } from "../services/Sessions.service.js"
import { sendEmailValidation } from "../utils/nodemailer.js"

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

export const googleController = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const data = await sessionsServices.googleAuth(profile)
        const token = await generateToken(data)
        const res = request.res
        res.cookie('cookieToken', token, {
            signed: true,
            maxAge: 3600000,
            httpOnly: true
        })
        done(null, token)
    } catch (err) {done(err)}
}

export const emailsValidationController = async (req, res, next) => {
    try {
        const {code} = req.body
        const cookie = req.signedCookies['cookieAuthEmail']
        const codeValid = await sessionsServices.codeValid({code, cookie})

        res.redirectPage('/')
    } catch (err) {next(err)}
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body
        const code = Math.random().toString(36).substring(2, 18)
        const sendEmailVerify = await sendEmailValidation({receiver: email, code})

        const date = {code, email}
        res.cookieAuthEmail(date)
    } catch (err) {next(err)}
}