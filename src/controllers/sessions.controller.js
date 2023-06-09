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

export const githubController = async (accessToken, refreshToken, profile, done) => {
    try {
        let dataUser 

        const existUser = await usersDao.get({email: profile.emails[0].value})
        if (existUser.length === 0) {
            const parts = profile.displayName.split(' ')
            
            const addUser = {
                firstname: parts[0],
                lastname: parts[1],
                email: profile.emails[0].value
            }
            const newUser = await usersDao.post(addUser)
            dataUser = {
                id: newUser._id,
                name: profile.displayName,
                emailAddress: newUser.emailAddress,
                role: 'user'
            }
        } else {
            dataUser ={
                id: existUser[0]._id,
                name: `${existUser[0].firstname} ${existUser[0].lastname}`,
                emailAddress: existUser[0].emailAddress,
                role: 'user'
            }
        }

        done(null, dataUser)
    } catch (err) {done(err, null)}
}

export const emailsValidationController = async (req, res, next) => {
    try {
        const {code} = req.body
        const cookie = req.signedCookies['cookieAuthEmail']
        const codeValid = await sessionsServices.codeValid({code, cookie})

        res.redirectPage('/')
    } catch (err) {next(err)}
}