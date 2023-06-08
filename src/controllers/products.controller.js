import { ApiError } from "../errors/Api.error.js"
import { productServices } from "../services/products.service.js"

export const getProductsController = async (req, res, next) => {
    try {
        const { page=1, limit=10, category, status, sort } = req.query

        const payload = await productServices.paginate({ page, limit, category, status, sort })

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
        const { title, description, code, price, stock, category, thumbnails } = req.body
        const existProd = await productServices.get({code})
        if (existProd.length != 0) throw new ApiError('User existing', 400)
        const payload = await productServices.post({ title, description, code, price, stock, category, thumbnails })

        res.jsonSuccess(payload)
    } catch (err) {next(err)}
}

export const putProductsController = async (req, res, next) => {
    try {
        const pid = req.pid
        const updated = req.body
        const response = await productServices.put({_id: pid}, updated)

        res.jsonMessage('Product updated')
    } catch (err) {next(err)}
}

export const deleteProductsController = async (req, res, next) => {
    try {
        const pid = req.pid
        const del = await productServices.delete({_id: pid})

        res.jsonMessage('Product deleted')
    } catch (err) {next(err)}
}