import { SessionsDto } from "../dao/DTOs/sessions.dto.js"
import { usersDao } from "../dao/factory.dao.js"
import { EMAIL_ADMIN, PASSWORD_ADMIN } from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { isValidPassword } from "../utils/bcrypt.js"

class SessionsServices {
    async login (data) {
        const { email, password } = data

        if (email === EMAIL_ADMIN && password === PASSWORD_ADMIN) return new SessionsDto('admin')
        const existUser = await usersDao.get({email})
        if (!existUser) throw new ApiError(`User or password invalid`, 400)
        if (!isValidPassword(existUser, password)) throw new ApiError(`User or password invalid`, 400)
        
        return new SessionsDto(existUser)
    }

    async codeValid ({code, cookie}) {
        const {email} = cookie
        if (code !== cookie.code) throw new ApiError('Code entered invalid', 400)
        const user = await usersDao.get({email})
        const {_id} = user[0]
        const update = await usersDao.put(_id, {verified: true})
        return
    }
}

export const sessionsServices = new SessionsServices()