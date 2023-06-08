// import { cartsServices } from '../daos/services/Carts.services.js'
// import { productsServices } from '../daos/services/Products.services.js'


// export const indexController = async (req, res, next) => {
//     try {
//         const arrayPage = []
//         let prevLink = '#'
//         let nextLink = '#'
//         const dataUser = req.user.user
//         const { page=1, limit=3, category, sort } = req.query

//         const { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage 
//         } = await productsServices.paginate({ page, limit, category, sort })
//         //for navigation button
//         for (let i = 1; i <= totalPages; i++) {
//             arrayPage.push(i)
//         }

//         if (hasPrevPage) prevLink = `/?page=${prevPage}`
//         if (hasNextPage) nextLink = `/?page=${nextPage}`

//         res.renderPage('index',{
//         payload: docs,
//         totalPages,
//         hasPrevPage,
//         prevPage,
//         hasNextPage,
//         nextPage,
//         arrayPage,
//         prevLink,
//         nextLink,
//         dataUser
//     })
//     } catch (err) {next(err)}
// }

// export const cartController = async (req, res, next) => {
//     try {
//         const cart = await cartsServices.get({_id: req.user.user.cart})
//         const prods = cart[0].products

//         res.renderPage('cart', {payload: prods})
//     } catch (err) {next(err)}
// }