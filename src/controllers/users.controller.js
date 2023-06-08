import { usersServices } from "../services/Users.service.js"

export const postUsersController = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        
        const cart = await usersServices.post({ first_name, last_name, email, age, password })

        res.jsonSuccess({ first_name, last_name, email, age, cart: cart._id })
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