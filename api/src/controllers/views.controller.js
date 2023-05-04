import { cartsServices } from '../daos/services/Carts.services.js'
import { productsServices } from '../daos/services/Products.services.js'

export const indexController = async (req, res, next) => {
    try {
        const arrayPage = []
        let prevLink = '#'
        let nextLink = '#'
        const { name, email, role} = req.session

        const { page=1, limit=3, category, sort } = req.query

        const { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage 
        } = await productsServices.productsPaginate({ page, limit, category, sort })
        //for navigation button
        for (let i = 1; i <= totalPages; i++) {
            arrayPage.push(i)
        }

        if (hasPrevPage) prevLink = `/?page=${prevPage}`
        if (hasNextPage) nextLink = `/?page=${nextPage}`
        
        res.status(200).render('index',
        {dataUser: {name, email, role},
        payload: docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
        arrayPage,
        prevLink,
        nextLink})
    } catch (err) {next(err)}
}

export const cartController = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const cart = await cartsServices.getCarts({_id: cid})
        const prods = cart[0].products
    
        res.status(200).render('cart', {
            status: 'success',
            payload: prods
        })
    } catch (err) {next(err)}
}