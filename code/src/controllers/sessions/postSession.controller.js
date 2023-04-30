import { userServices } from "../../daos/mongoDb/services/Users.services.js"
import { ApiError } from "../../errors/ApiError.errors.js"

export const postLoginController = async (req, res, next) => {
    try {
        //var
        let session = req.session
        const user =  req.body
        const { email, password } = user

        const existUser = await userServices.getUsers({emailAddress: email})

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            session.name = existUser[0].surname
            session.email = email
            session.role = 'admin'
            return res.status(302).redirect('/')
        }

        if (existUser.length === 0) {throw new ApiError(`User or password invalid`, 400)}
        if (existUser[0].password !== password) {throw new ApiError(`User or password invalid`, 400)}

        session.name = existUser[0].surname
        session.email = email
        session.role = 'user'

        return res.status(302).redirect('/')
    } catch (err) {next(err)}
}

export const postSignupController = async (req, res, next) => {
    try {
        //vars
        const user = req.body
        const {surname, lastname, emailAddress, password} = user
        if (!surname || !lastname || !emailAddress || !password) {throw new ApiError('keys or value invalid', 400)}
        const existUser = await userServices.getUsers({emailAddress})

        if (existUser.length > 0) {throw new ApiError(`user exist`, 400)}

        const newUser = await userServices.postUser(user)
        res.status(307).redirect('/login')
    } catch (err) {next(err)}
}

export const deleteSessionController = async (req, res, next) => {
    try {
        //var
        req.session.destroy( err => {
            if (!err) {
                return res.status(307).redirect('/login')
            }
            return res.status(400).json({
                status: false,
                payload: 'Logout Error'
            })
        })
    } catch (err) {next(err)}
}

//const connection = mongoose.connection.db.collection('sessions').find({}).toArray()