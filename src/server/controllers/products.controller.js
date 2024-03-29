import { productServices } from "../services/Products.service.js"

export const getProductsController = async (req, res, next) => {
    try {
        const { page=1, limit=5, category, sort={title: 1}, provider, price } = req.query

        const payload = await productServices.paginate({ page, limit, category, sort, provider, price })

        res.jsonSuccess(payload)
    } catch (err) {next(err)}
}

export const getProductsByIdController = async (req, res, next) => {
    try {
        const pid = req.pid

        const prod = await productServices.get({_id: pid})

        res.jsonSuccess(prod)
    } catch (err) {next(err)}
}

export const postProductsController = async (req, res, next) => {
    try {
        const { title, description, code, prices, stock, category, promotion, provider, thumbnails } = req.body
        const user = req.user.user
        
        const payload = await productServices.post({ title, description, code, prices, stock, category, promotion, provider, thumbnails, user })

        res.jsonSuccess(payload)
    } catch (err) {next(err)}
}

export const putProductsController = async (req, res, next) => {
    try {
        const pid = req.pid
        const updated = req.body
        const user = req.user.user

        const response = await productServices.put({_id: pid, user}, updated)

        res.jsonMessage('Product updated')
    } catch (err) {next(err)}
}

export const deleteProductsController = async (req, res, next) => {
    try {
        const pid = req.pid
        const user = req.user.user
        
        const del = await productServices.delete({_id: pid, user})

        res.jsonMessage('Product deleted')
    } catch (err) {next(err)}
}

export const postUploadThumbnailsController = async (req, res, next) => {
    try {
        const thumbnails = req.files
        const user = req.user.user

        const result = await productServices.uploadThumbnails({thumbnails, user})

        res.jsonSuccess(result)
    } catch (err) {next(err)}
}