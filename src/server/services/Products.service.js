import { ProductsDtoPost } from "../dao/DTOs/products.dto.js";
import { productsDao } from "../dao/factory.dao.js";
import { ApiError } from "../errors/Api.error.js";


class ProductsServices {
    async paginate (queryParams) {
        const arrayPage = []
        const allCategories = await productsDao.distinct('category')
        const allProvider = await productsDao.distinct('title')
        const { page, limit, category, sort, provider } = queryParams
        const sortOption = sort === 'asc' ? '-price' : 'price'
        const { docs,totalPages,hasPrevPage,prevPage,hasNextPage,nextPage} = await productsDao.paginate({page, limit, category, sort: sortOption, provider})

        //for navigation button
        for (let i = 1; i <= totalPages; i++) {
            arrayPage.push(i)
        }
        return { docs, allCategories, allProvider, arrayPage, hasPrevPage, prevPage, hasNextPage, nextPage }
    }

    async get (filter) {
        if (!filter) return await productsDao.get()
        const prod = await productsDao.get(filter)
        if (!prod) throw new ApiError(`cart or product invalid`, 404)
        return prod
    }

    async post (prod) {
        const addProd = new ProductsDtoPost(prod)
        const newProd = await productsDao.post(addProd)
        return newProd
    }

    async put (pid, update){
        const up = await productsDao.put(pid, update)
        return
    }

    async delete (pid) {
        const del = await productsDao.put(pid, {status: false})
        return
    }
}

export const productServices = new ProductsServices()