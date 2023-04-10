import { ApiError } from "../../../errors/ApiError.errors.js";
import { productsServices } from "../../../daos/mongoDb/services/Products.services.js"

export const deleteProductsValidators = async (pid) => {
    //product exist?
    const existProd = await productsServices.getProductById(pid)
    if (!existProd){throw new ApiError(`product does't exist`, 406)}
    existProd.status = false
    //return
    const deleted = await productsServices.putProduct({"_id": pid}, existProd)

    return deleted
}