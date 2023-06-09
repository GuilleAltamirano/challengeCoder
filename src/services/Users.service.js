import { UsersDto } from "../dao/DTOs/users.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import { EMAIL_ADMIN } from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash } from "../utils/bcrypt.js"

class UsersServices {
    async post (data) {
        let { first_name, last_name, email, age, password } = data
        const existUser = await usersDao.get({email})
        if ((email === EMAIL_ADMIN) || existUser.length > 0) throw new ApiError('user existing', 400)

        const cart = await cartsDao.post()
        password = createHash(password)
        const newUser = await usersDao.post(new UsersDto({first_name, last_name, email, age, password, cart: cart._id}))
        
        return {newUser}
    }

    async put (data) {
        const {uid, update} = data
        const user = await usersDao.get({_id: uid})
        if (!user) throw new ApiError('User invalid', 400)
        const { email=user.email, age=user.age, password=user.password, role=user.role } = update
        const updated = await usersDao.put({ email, age, password, role })
        return updated
    }
}

export const usersServices = new UsersServices()