import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"

export const homeValidator = async(query) => {
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
    //return
    return {
        status: true,
        payload: docs,
        totalPages,
        hasPrevPage,
        prevPage,
        hasNextPage,
        nextPage
    }

}