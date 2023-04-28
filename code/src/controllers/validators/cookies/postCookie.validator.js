import { ApiError } from "../../../errors/ApiError.errors.js"

export const postCookieValidator = async (type, body ) => {
    //cookie name is mode?
    if (type != 'mode') {throw new ApiError(`Cookie ${type} invalid`, 400)}

    if (typeof body != 'boolean') {throw new ApiError(`type cookie invalid`, 401)}

    //return
    return {
        message: 'cookie created successfully',
        cookieName: type,
        cookieValue: body,
        expires: '3600000 ms (1 hour)'
    }
}