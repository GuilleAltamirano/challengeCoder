import { productsServices } from "../daos/services/Products.services.js"
import { putProductValidation } from "../validations/products.validation.js"

export const getProductsController = async (req, res, next) => {
    try {
        let {prevLink, nextLink} = '#'
        const { page=1, limit=10, category, status, sort } = req.query

        const { docs,totalPages,hasPrevPage,prevPage,hasNextPage,nextPage} = await productsServices.productsPaginate({ page, limit, category, status, sort })
        
        if (hasPrevPage) prevLink = `/api/products/?page=${prevPage}`
        if (hasNextPage) nextLink = `/api/products/?page=${nextPage}`

        res.status(200).json({
            status: 'success',
            payload: docs,
            totalPages,
            hasPrevPage,
            prevPage,
            hasNextPage,
            nextPage,
            prevLink,
            nextLink
        })
    } catch (err) {next(err)}
}

export const getProductsByIdController = async (req, res, next) => {
    try {
        const pid = req.params.pid
        const prod = await productsServices.getProducts({_id: pid})

        res.status(200).json({
            status: 'success',
            payload: prod
        })
    } catch (err) {next(err)}
}

export const postProductsController = async (req, res, next) => {
    try {
        const addProd = req.body
        const newProd = await productsServices.postProduct(addProd)

        res.status(200).json({
            status: 'success',
            payload: newProd
        })
    } catch (err) {next(err)}
}

export const putProductsController = async (req, res, next) => {
    try {
        const pid = req.params.pid
        const updated = req.body
        const validation = await putProductValidation({pid, updated})

        res.status(200).json({
            status: 'success',
            payload: validation
        })
    } catch (err) {next(err)}
}

export const deleteProductsController = async (req, res, next) => {
    try {
        const pid = req.params.pid
        const del = await productsServices.putProduct({_id: pid}, {status: false})

        res.status(200).json({
            status: 'success',
            payload: del
        })
    } catch (err) {next(err)}
}