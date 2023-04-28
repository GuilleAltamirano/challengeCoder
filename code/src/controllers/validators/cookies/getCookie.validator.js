import { ApiError } from '../../../errors/ApiError.errors.js'

export const getCookieValidator = async (name, cookies) => {
    if (name != 'mode') {throw new ApiError(`Invalid cookie ${name}`, 400)}
    
    //return
    return cookies.mode
}