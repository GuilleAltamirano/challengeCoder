import { sessionsServices } from "../services/Sessions.service.js"
import passport from "passport"

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
        const token = await sessionsServices.login({email, password})

        res.cookieSession(token)
    } catch (err) {next(err)}
}

export const googleController = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const token = await sessionsServices.googleAuth(profile)

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
        const code = req.query.code

        const codeValid = await sessionsServices.codeValid({_id: code})

        res.redirectPage('/')
    } catch (err) {next(err)}
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body
        const code = await sessionsServices.forgotPassword({email})

        res.redirectPage('/login')
    } catch (err) {next(err)}
}

export const newPasswordController = async (req, res, next) => {
    try {
        //is valid query with jwt 
        passport.authenticate('verification', (error, user) => {
            if (error) {return next(error)}
            if (user) return req.user = user
            return req.user = undefined
        })(req, res, next)
        //new email
        if (!req.user) return res.redirectPage('/forgotpassword')
        
        const {token, id} = await sessionsServices.newPassword({email: req.user.user})
        //cookie for challenge password
        return res.cookieNewPassword({token, id})
    } catch (err) {next(err)}
}
