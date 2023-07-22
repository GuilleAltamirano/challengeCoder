import { UsersDto } from "../dao/DTOs/users.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import { generateToken } from "../config/passport.config.js"
import { sendEmailValidation } from "../utils/nodemailer.js"
import { SessionsDto } from "../dao/DTOs/sessions.dto.js"
import { __dirname } from "../utils/utils.js"

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
        if (existUser[0].role === 'USER' && existUser[0].status !== 'AllDocuments' || existUser[0].status !== 'AllDocuments') throw new ApiError('Documentation incomplete', 401)
        existUser[0].role === 'USER' ? await usersDao.put({_id: uid}, {role: 'PREMIUM'}) : await usersDao.put({_id: uid}, {role: 'USER'})

        const updateUser = await usersDao.get({_id: uid})
        const user = new SessionsDto(updateUser[0])
        const token = await generateToken(user)
        
        return token
    }

    async uploadsDocuments ({files, user}) {
        const dataUser = await usersDao.get({email: user.email})
        const documents = dataUser[0].documents
        
        //delete __dirname of path
        const documentation = async (name, path) => {
            const reference = path.replace(__dirname, "")
            return {name, reference}
        }
        
        //delete path extra
        if (files.profile[0].path) {
            const path = files.profile[0].path
            const last = "uploads";
            const deletePath = path.replace(path.split(last)[0], "/")
            
            dataUser[0].profile = deletePath
        } 

        if (files.identification && files.identification[0].path) documents.push(await documentation(files.identification[0].fieldname, files.identification[0].path))
        if (files.address && files.address[0].path) documents.push(await documentation(files.address[0].fieldname, files.address[0].path))
        if (files.account_status && files.account_status[0].path) documents.push(await documentation(files.account_status[0].fieldname, files.account_status[0].path))
        
        //update status
        const qtyDocuments = 3
        if (documents && documents.length === qtyDocuments) {
            let acu = 0
            for (let i = 0; i < documents.length; i++) {
                if (documents[i].name === 'identification' && documents[i].reference.length > 0) acu += 1
                if (documents[i].name === 'address' && documents[i].reference.length > 0) acu += 1
                if (documents[i].name === 'account_status' && documents[i].reference.length > 0) acu += 1
            }
            
            if (acu === qtyDocuments) dataUser[0].status = 'AllDocuments'
        }

        const userUpdate = await usersDao.put({_id: dataUser[0]._id}, dataUser[0])

        return 
    }

}

export const usersServices = new UsersServices()