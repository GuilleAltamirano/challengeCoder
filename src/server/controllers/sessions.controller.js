import { sessionsServices } from "../services/Sessions.service.js"
import passport from "passport"
import commander from "../utils/commander.js"

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

export const logoutController = async (req, res, next) => {
    try {
        const user = req.user.user
        
        const updateLastConnection = await sessionsServices.logout({user})

        res.clearCookie('cookieToken').redirectPage('/login')
    } catch (err) {next(err)}
}

export const googleController = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const token = await sessionsServices.googleAuth({profile})
        console.log('estoy aca');
        const res = request.res
        res.cookie('cookieToken', token, {
            signed: true,
            maxAge: 3600000 * 12,
            httpOnly: true
        })
        done(null, token)
    } catch (err) {done(err)}
}

export const emailsValidationController = async (req, res, next) => {
    try {
        const code = req.query.code //code is uid

        const codeValid = await sessionsServices.codeValid({_id: code})

        res.redirectPage('/')
    } catch (err) {next(err)}
}

export const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body

        const code = await sessionsServices.forgotPassword({email})

        if (commander.mode === 'dev') return res.jsonSuccess({code, redirect: '/login'}) //for supertest
        return res.redirectPage('/login')
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
        if (!req.user) return res.redirectPage('/forgotpassword')
        
        const {token, id} = await sessionsServices.newPassword({email: req.user.user}) //jwt valid
        
        //cookie and redirect for challenge password
        return res.cookieNewPassword({token, id})
    } catch (err) {next(err)}
}
