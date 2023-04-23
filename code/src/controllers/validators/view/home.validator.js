import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"

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
    //prev link
    if (hasPrevPage) prevLink = `http://localhost:8080/?page=${prevPage}`
    if (hasNextPage) nextLink = `http://localhost:8080/?page=${nextPage}`

    //return
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