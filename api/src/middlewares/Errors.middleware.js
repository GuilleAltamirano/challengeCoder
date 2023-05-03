import { ApiError } from "../errors/Api.error.js"

export const errorMiddlewares = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            status: false,
            error: err.message
        })
    }

    console.error({error: err.message, stack: err.stack})
    return res.status(500).json({
        status: false,
        error: 'Internal Server Error'
    })
}