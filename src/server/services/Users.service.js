import { UsersDto, UsersPaginateDto } from "../DTOs/users.dto.js"
import { cartsDao, usersDao } from "../dao/factory.dao.js"
import varsEnv from "../env/vars.env.js"
import { ApiError } from "../errors/Api.error.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import { generateToken } from "../config/passport.config.js"
import { sendEmailValidation } from "../utils/nodemailer.js"
import { SessionsDto } from "../DTOs/sessions.dto.js"
import { __dirname } from "../utils/utils.js"

const {EMAIL_ADMIN, SUPERIOR_PRIVILEGES, STATUS_DOCUMENTS_USERS, EMAIL_VERIFIED_USERS, ROLE_USER_ADVANCED, ROLE_USER_BASIC, UPLOAD_DOCUMENT_ONE, UPLOAD_DOCUMENT_TWO, UPLOAD_DOCUMENT_THREE} = varsEnv

class UsersServices {
    async paginate ({ role, status, verified, page }) {
        const users = []
        const arrayPage = []

        const {docs, totalDocs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await usersDao.paginate({role, status, verified, page})

        if (page > totalPages) throw new ApiError('Query error', 400)
        //remove sensitive data
        docs.forEach(doc => {
            const user = new UsersPaginateDto(doc)
            users.push(user)
        })
        //for navigation button
        let start = Math.max(1, page - 5)
        let end = Math.min(totalPages, start + 9)
        for (let i = start; i <= end; i++) {
            arrayPage.push(i)
        }
        
        return {users, pagination: {arrayPage, hasPrevPage, prevPage, hasNextPage, nextPage, totalPages} }
    }

    async post ({ first_name, last_name, email, age, password }) {
        const emailLower = email.toLowerCase()
        const existUser = await usersDao.get({email: emailLower})
        if ((email === EMAIL_ADMIN) || existUser.length > 0) throw new ApiError('user existing', 400)

        const cart = await cartsDao.post()
        password = await createHash(password)
        const newUser = await usersDao.post(new UsersDto({first_name, last_name, email: emailLower, age, password, cart: cart._id}))

        const sendEmailVerify = await sendEmailValidation({receiver: email, code: newUser._id, use: 'verify', user: first_name})

        return
    }

    async put ({uid}, update) {
        const user = await usersDao.get({_id: uid})
        if (!user) throw new ApiError('User invalid', 400)

        const updated = await usersDao.put({_id: uid}, update)
        return updated
    }

    async newPassword ({_id, password, email}) {
        const existUser = await usersDao.get({_id})
        if (existUser.length === 0) throw new ApiError('User no exist', 400)
        if (existUser[0].email !== email && email !== EMAIL_ADMIN) throw new ApiError('Credentials invalid', 400)

        const isValid = await isValidPassword(existUser[0], password)
        if (isValid) throw new ApiError('Invalid, same password', 400)

        const newPassword = await createHash(password)

        const updateUser = await usersDao.put(_id, {password: newPassword})
        
        return
    }

    async challengeRole ({uid}) {
        const existUser = await usersDao.get({_id: uid})
        if (existUser.length === 0) throw new ApiError('User no existing', 400)

        if (existUser[0].role === SUPERIOR_PRIVILEGES) return
        if (existUser[0].role === 'USER' && (existUser[0].status !== STATUS_DOCUMENTS_USERS || existUser[0].email_verified !== EMAIL_VERIFIED_USERS)) throw new ApiError('Documentation incomplete', 401)
        existUser[0].role === 'USER' ? await usersDao.put({_id: uid}, {role: ROLE_USER_ADVANCED}) : await usersDao.put({_id: uid}, {role: ROLE_USER_BASIC})

        const updateUser = await usersDao.get({_id: uid})
        const user = new SessionsDto(updateUser[0]) //remove sensitive data
        const token = await generateToken(user)
        
        return token
    }

    async uploadsDocuments ({files, user}) {
        if (!files) throw new ApiError('Upload incomplete or invalid', 400)
        const dataUser = await usersDao.get({email: user.email})
        const documents = dataUser[0].documents
        
        //remove __dirname of path
        const documentation = async (name, path) => {
            const reference = path.replace(__dirname, "")
            return {name, reference}
        }
        
        //remove extra path
        if (files && files.profile) {
            const path = files.profile[0].path
            const last = "uploads"
            const deletePath = path.replace(path.split(last)[0], "/")
            
            dataUser[0].profile = deletePath
        } 

        if (files && files.identification) documents.push(await documentation(files.identification[0].fieldname, files.identification[0].path))
        if (files && files.address) documents.push(await documentation(files.address[0].fieldname, files.address[0].path))
        if (files && files.account_status) documents.push(await documentation(files.account_status[0].fieldname, files.account_status[0].path))
        
        //update status
        const qtyDocuments = 3
        if (documents && documents.length === qtyDocuments) {
            let acu = 0
            for (let i = 0; i < documents.length; i++) {
                if (documents[i].name === UPLOAD_DOCUMENT_ONE && documents[i].reference.length > 0) acu += 1
                if (documents[i].name === UPLOAD_DOCUMENT_TWO && documents[i].reference.length > 0) acu += 1
                if (documents[i].name === UPLOAD_DOCUMENT_THREE && documents[i].reference.length > 0) acu += 1
            }
            
            if (acu === qtyDocuments) dataUser[0].status = STATUS_DOCUMENTS_USERS
        }

        const userUpdate = await usersDao.put({_id: dataUser[0]._id}, dataUser[0])

        return 
    }

    async deleteUsers () {
        let twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

        const deleted = await usersDao.deleteUsers(twoDaysAgo)

        return deleted
    }

    async delUser ({uid}) {
        const existUser = await usersDao.get({_id: uid})
        if (existUser.length === 0) throw new ApiError('User invalid', 400)

        const deleted = await usersDao.delete({_id: uid})

        return existUser[0].fullname
    }

}

export const usersServices = new UsersServices()