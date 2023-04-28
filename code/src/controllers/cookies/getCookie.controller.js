import { getCookieValidator } from "../validators/cookies/getCookie.validator.js"

export const getCookieController = async (req, res, next) => {
    try {
        //var
        const name = req.params.name
        const cookies = req.cookies
        const verification = await getCookieValidator(name, cookies)
        //return
        res.status(200).json({
            status: true,
            payload: verification
        })
    } catch (err) {next(err)}
}