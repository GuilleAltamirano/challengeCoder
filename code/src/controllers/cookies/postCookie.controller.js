import { postCookieValidator } from "../validators/cookies/postCookie.validator.js"

export const postCookieController = async (req, res, next) => {
    try {
        const body = req.body.mode
        const type = req.params.typeCookie
        const validator = await postCookieValidator(type, body)
        //create cookie
        res.cookie(type, body, {maxAge: 3600000})
        //return
        res.status(200).json({
            status: true,
            payload: validator
        })
    } catch (err) {next(err)}
}