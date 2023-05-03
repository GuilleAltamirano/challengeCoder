import { productsServices } from "../daos/services/Products.services.js"
import { ApiError } from "../errors/Api.error.js"

export const putProductValidation = async ({pid, updated}) => {
    const existProd = await productsServices.getProducts({_id: pid})

    //validate values
    for (const i in updated) {
        //keys correct?
        if (i !== 'title' && i !== 'description' && i !== 'code' && i !== 'price' && i !== 'price' && i !== 'stock' && i !== 'category' && i !== 'thumbnails'){throw new ApiError(`Key ${i} not valid`, 400)}
        //values
        if ((i === 'title') && (typeof updated[i] !== 'string' || updated[i].length < 4)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'description') && (typeof updated[i] !== 'string' || updated[i].length < 10)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'code') && (typeof updated[i] !== 'string' || updated[i].length < 6)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'price') && (typeof updated[i] !== 'number' || updated[i] <= 0)){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'stock') && (typeof updated[i] !== 'number')){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'category') && (typeof updated[i] !== 'string')){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
        if ((i === 'thumbnails') && (!Array.isArray(updated[i]))){throw new ApiError(`${i} ${updated[i]} not valid`, 400)}
    }

    const update = await productsServices.putProduct({_id: pid}, updated)

    return update
} 