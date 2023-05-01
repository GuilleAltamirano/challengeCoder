import { homeValidator } from "../validators/view/home.validator.js"

export const homeController = async (req, res, next) => {
    try {
        //var
        const query = req.query
        const session = req.session
        const verification = await homeValidator(query, session)
        //return
        res.status(200).render('home', verification)
    } catch (err) {next(err)}
}