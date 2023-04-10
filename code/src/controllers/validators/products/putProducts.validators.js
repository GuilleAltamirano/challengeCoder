import { ApiError } from "../../../errors/ApiError.errors.js"
import { productsServices } from "../../../daos/mongoDb/services/products.services.js"

export const putProductsValidator = async (updated, pid) => {   
    //validate values
    for (const i in updated) {
        //keys correct?
        if (i !== 'title' && i !== 'description' && i !== 'code' && i !== 'price' && i !== 'price' && i !== 'stock' && i !== 'category' && i !== 'thumbnail'){throw new ApiError(`Key ${i} not valid`, 400)}
        //title
        if ((i === 'title') && (typeof updated[i] !== 'string' || updated[i].length < 4)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //description
        if ((i === 'description') && (typeof updated[i] !== 'string' || updated[i].length < 10)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //code
        if ((i === 'code') && (typeof updated[i] !== 'string' || updated[i].length < 6)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //price
        if ((i === 'price') && (typeof updated[i] !== 'number' || updated[i] <= 0)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //stock
        if ((i === 'stock') && (typeof updated[i] !== 'number')){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //category
        if ((i === 'category') && (typeof updated[i] !== 'string')){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        //thumbnail
        if ((i === 'thumbnail') && (typeof updated[i] !== 'object')){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
    }
    //product exist?
    const existProd = await productsServices.getProductById(pid)
    if (!existProd){throw new ApiError(`product does't exist`, 406)}
    //return
    const prodUpdated = await productsServices.putProduct({"_id": pid}, updated)
    return prodUpdated
}