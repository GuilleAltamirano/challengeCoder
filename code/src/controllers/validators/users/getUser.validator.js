import { userServices } from "../../../daos/mongoDb/services/Users.services.js"
import { ApiError } from "../../../errors/ApiError.errors.js"

export const getUsersValidator = async (email, password) => {
    //var
    const user = {
        emailAddress: email,
    }
    //exist user?
    const existUser = await userServices.getUsers(user)
    if (existUser.length === 0) {throw new ApiError(`email or password invalid`, 400)}

    if (existUser[0].password != password) {throw new ApiError(`email or password invalid`, 400)}
    //all ok
    return email
}
