import { UsersDto } from "../dao/DTOs/users.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"

class UsersServices {
    async post (data) {
        let { first_name, last_name, email, age, password } = data
        const existUser = await usersDao.get({email})
        if ((email === varsEnv.EMAIL_ADMIN) || existUser.length > 0) throw new ApiError('user existing', 400)

        const cart = await cartsDao.post()
        password = await createHash(password)
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

    async newPassword ({_id, password, email}) {
        const existUser = await usersDao.get({_id})
        if (existUser.length === 0) throw new ApiError('User no existing', 400)
        if (existUser[0].email !== email || email !== varsEnv.EMAIL_ADMIN) throw new ApiError('Credentials invalid', 400)

        const isValid = await isValidPassword(existUser[0], password)
        if (isValid) throw new ApiError('Invalid, same password', 400)

        const newPassword = await createHash(password)
        const upUser = await usersDao.put(_id, {password: newPassword})
        
        return
    }
}

export const usersServices = new UsersServices()