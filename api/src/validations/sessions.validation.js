import { userServices } from "../daos/services/Users.services.js"
import { ApiError } from "../errors/Api.error.js"

export const registerValidation = async (newUser) => {
    const { firstname, lastname, emailAddress, password } = newUser
    if (emailAddress === process.env.EMAIL) {throw new ApiError('Existing user', 400)}
    if (!firstname || !lastname || !emailAddress || !password) {throw new ApiError('Keys invalid', 400)}
    const existUser = await userServices.getUsers({emailAddress})
    if (existUser.length != 0) {throw new ApiError('Existing user', 400)}

    const add = await userServices.postUser({ firstname, lastname, emailAddress, password })

    return 
}
