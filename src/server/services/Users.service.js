import { UsersDto } from "../dao/DTOs/users.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import { generateToken, generateTokenForValidation } from "../config/passport.config.js"
import { sendEmailValidation } from "../utils/nodemailer.js"
import { SessionsDto } from "../dao/DTOs/sessions.dto.js"

class UsersServices {
    async post ({ first_name, last_name, email, age, password }) {
        const existUser = await usersDao.get({email})
        if ((email === varsEnv.EMAIL_ADMIN) || existUser.length > 0) throw new ApiError('user existing', 400)

        const cart = await cartsDao.post()
        password = await createHash(password)
        const newUser = await usersDao.post(new UsersDto({first_name, last_name, email, age, password, cart: cart._id}))

        const sendEmailVerify = await sendEmailValidation({receiver: email, code: newUser._id, use: 'verify', user: newUser.first_name})

        return
    }

    async put (data) {
        const {uid, update} = data
        const user = await usersDao.get({_id: uid})
        if (!user) throw new ApiError('User invalid', 400)
        const { email=user.email, age=user.age, password=user.password, role=user.role } = update
        const updated = await usersDao.put({ email, age, password, role })
        return updated
    }

    async newPassword ({_id, password, email}) {
        const existUser = await usersDao.get({_id})
        if (existUser.length === 0) throw new ApiError('User no exist', 400)
        if (existUser[0].email !== email && email !== varsEnv.EMAIL_ADMIN) throw new ApiError('Credentials invalid', 400)

        const isValid = await isValidPassword(existUser[0], password)
        if (isValid) throw new ApiError('Invalid, same password', 400)

        const newPassword = await createHash(password)
        const upUser = await usersDao.put(_id, {password: newPassword})
        
        return
    }

    async challengeRole ({uid}) {
        const existUser = await usersDao.get({_id: uid})
        if (existUser.length === 0) throw new ApiError('User no existing', 400)

        if (existUser[0].role === 'ADMIN') return
        const up = existUser[0].role === 'PREMIUM' ? await usersDao.put({_id: uid}, {role: 'USER'}) : await usersDao.put({_id: uid}, {role: 'PREMIUM'})

        const updateUser = await usersDao.get({_id: uid})
        const user = new SessionsDto(updateUser[0])
        const token = await generateToken(user)
        
        return token
    }
}

export const usersServices = new UsersServices()