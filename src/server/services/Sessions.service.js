import { GoogleDto } from "../dao/DTOs/google.dto.js"
import { SessionsDto } from "../dao/DTOs/sessions.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { isValidPassword } from "../utils/bcrypt.js"

class SessionsServices {
    async login (data) {
        const { email, password } = data
        if (email === varsEnv.EMAIL_ADMIN && password === varsEnv.PASSWORD_ADMIN) return new SessionsDto('admin')
        const existUser = await usersDao.get({email})
        if (!existUser) throw new ApiError(`User or password invalid`, 400)
        if (!isValidPassword(existUser[0], password)) throw new ApiError(`User or password invalid`, 400)
        return new SessionsDto(existUser[0])
    }

    async codeValid ({code, cookie}) {
        const {email} = cookie
        if (code !== cookie.code) throw new ApiError('Code entered invalid', 400)
        const user = await usersDao.get({email})
        const {_id} = user[0]
        const update = await usersDao.put(_id, {verified: true})
        return
    }

    async googleAuth (profile) {
        if (profile.email === varsEnv.EMAIL_ADMIN) return new SessionsDto('admin')
        const existUser = await usersDao.get({email: profile.email})
        if (existUser.length === 0) {
            const cart = await cartsDao.post()
            const newUser = new GoogleDto({profile, cart})
            const addUser = await usersDao.post(newUser)

            return new SessionsDto(addUser)
        }

        return new SessionsDto(existUser[0])
    }
}

export const sessionsServices = new SessionsServices()