import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"
import { PORT } from "../../../app.js"

export const homeValidator = async(query) => {
    //var
    const arrayPage = []
    let prevLink = '#'
    let nextLink = '#'
    //destructuring query
    const { page=1, limit=3, category, sort } = query
    //destructuring paginate
    const { docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage, 
    } = await productsServices.productsPaginate({ page, limit, category, sort })
    //for navigation button
    for (let i = 1; i <= totalPages; i++) {
        arrayPage.push(i)
    }

    if (hasPrevPage) prevLink = `http://localhost:${PORT}/?page=${prevPage}`
    if (hasNextPage) nextLink = `http://localhost:${PORT}/?page=${nextPage}`

    return {
        status: true,
        payload: docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage,
        arrayPage,
        prevLink,
        nextLink
    }

}