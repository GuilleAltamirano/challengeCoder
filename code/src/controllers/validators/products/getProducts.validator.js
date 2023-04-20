import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"

export const getProductsValidator = async (query) => {
    //destructuring query
    const { page=1, limit=10, category, sort } = query
    //product end
    const products = await productsServices.productsPaginate({ page, limit, category, sort })
    //return
    return products
}