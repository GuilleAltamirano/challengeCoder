import varsEnv from "../env/vars.env.js"
import { usersServices } from "../services/Users.service.js"

const {NAME_COOKIE_SESSION} = varsEnv

export const getUsersPaginateController = async (req, res, next) => {
    try {
        const {role=null, status=null, verified=null, page=1} = req.query

        const result = await usersServices.paginate({role, status, verified, page})

        res.jsonSuccess(result)
    } catch (err) {next(err)}
}

export const postUsersController = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        
        const newUser = await usersServices.post({ first_name, last_name, email, age, password })
        
        res.redirectPage('/login')
    } catch (err) {next(err)}
}

export const putUsersController = async (req, res, next) => {
    try {
        const uid = req.uid
        const update = req.body
        const test = await usersServices.put({uid, update})
        
        res.jsonMessage('User updated')
    } catch (err) {next(err)}
}

export const putNewPasswordController = async (req, res, next) => {
    try {
        const id = req.uid
        const password = req.body.password

        const services = await usersServices.newPassword({_id: id, password, email: req.user.user.email})

        res.redirectPage('/login')
    } catch (err) {next(err)}
}

export const putRoleController = async (req, res, next) => {
    try {
        const uid = req.uid

        const token = await usersServices.challengeRole({uid})

        res.clearCookie(NAME_COOKIE_SESSION).cookieSession(token) //Change cookie
    } catch (err) {next(err)}
}

export const postUploadsDocumentsController = async (req, res, next) => {
    try {
        const files = req.files
        const user = req.user.user

        const status = await usersServices.uploadsDocuments({files, user})

        res.jsonMessage('Upload success')
    } catch (err) {next(err)}
}

export const deleteUsersController = async (req, res, next) => {
    try {
        const result = await usersServices.deleteUsers()

        res.jsonMessage('Users deleted')
    } catch (err) {next(err)}
}

export const delUserController = async (req, res, next) => {
    try {
        const uid = req.uid

        const result = await usersServices.delUser({uid})

        res.jsonMessage(`User ${result} deleted`)
    } catch (err) {next(err)}
}