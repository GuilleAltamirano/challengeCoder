export const multerPRoductsControllers = async (req, res, next) => {
    try {
        console.log(req)
        console.log(file);
        //return
        res.status(200).json({
            status: true,
            payload: 'All Ok'
        })
    } catch (err) {next(err)}
}