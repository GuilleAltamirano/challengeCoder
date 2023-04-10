import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"

export const getIdProductsValidator = async (pid) => {
    //product exist?
    const existProd = await productsServices.getProductById(pid)
    if (!existProd){throw new ApiError(`product does't exist`, 406)}
    //return
    return existProd
}