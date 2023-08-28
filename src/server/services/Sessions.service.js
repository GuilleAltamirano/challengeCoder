import { GoogleDto } from "../DTOs/google.dto.js"
import { SessionsDto } from "../DTOs/sessions.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { isValidPassword } from "../utils/bcrypt.js"
import { generateToken, generateTokenForValidation } from "../config/passport.config.js"
import { sendEmailValidation } from "../utils/nodemailer.js"

const {EMAIL_ADMIN, PASSWORD_ADMIN, SUPERIOR_PRIVILEGES, EMAIL_VERIFIED_USERS} = varsEnv

class SessionsServices {
    async login ({ email, password }) {
        const emailLower = email.toLowerCase()

        //is admin? For greater security, the admin must be exact regarding capital letters
        if (email === EMAIL_ADMIN && password === PASSWORD_ADMIN) return new SessionsDto(SUPERIOR_PRIVILEGES)

        const existUser = await usersDao.get({email: emailLower})
        if (existUser.length === 0) throw new ApiError(`User or password invalid`, 400)

        if (!await isValidPassword(existUser[0], password)) throw new ApiError(`User or password invalid`, 400)

        const updateLastConnection = await usersDao.put({_id: existUser[0]._id}, {last__connection: new Date()})
        const user = new SessionsDto(existUser[0]) //remove sensitive data
        const token = await generateToken(user)

        return token
    }

    async logout ({user}) {
        const emailLower = user.email.toLowerCase()
        
        const existUser = await usersDao.get({email: emailLower})
        if (!existUser[0]) throw new ApiError(`User or password invalid`, 400)

        const updateLastConnection = await usersDao.put({_id: existUser[0]._id}, {last__connection: new Date()})

        return
    }

    async codeValid ({_id}) {
        const user = await usersDao.get({_id})
        if (user.length === 0) throw new ApiError('User invalid', 400)

        const update = await usersDao.put({_id}, {email_verified: EMAIL_VERIFIED_USERS})
        return update
    }

    async googleAuth ({profile}) {
        if (profile.email === EMAIL_ADMIN) return new SessionsDto(SUPERIOR_PRIVILEGES)
        
        const existUser = await usersDao.get({email: profile.email})
        if (existUser.length === 0) {
            const cart = await cartsDao.post()
            const newUser = new GoogleDto({profile, cart})
            const addUser = await usersDao.post(newUser)

            const data = new SessionsDto(addUser)
            const token = await generateToken(data)
            return {token}
        }

        const data = new SessionsDto(existUser[0])
        const token = await generateToken(data)
        
        return {token}
    }

    async forgotPassword ({email}) {
        const emailLower = email.toLowerCase()

        const existUser = await usersDao.get({email: emailLower})
        if (existUser.length === 0) throw new ApiError('User no exist', 400)
        //The code is to validate authenticity 
        const code = await generateTokenForValidation(email)
        const sendEmailVerify = await sendEmailValidation({receiver: email, code, use: 'forgot', user: existUser[0].first_name})

        return {code} //return for developer mode
    }

    async newPassword ({email}) {
        const emailLower = email.toLowerCase()

        const existUser = await usersDao.get({email: emailLower})
        if (!existUser[0]) throw new ApiError(`User no exist`, 400)

        const user = new SessionsDto(existUser[0]) //remove sensitive data
        const token = await generateToken(user)

        return {token, id: existUser[0]._id}
    }  
}

export const sessionsServices = new SessionsServices()