import { ProductsDtoPost } from "../DTOs/products.dto.js";
import { productsDao, pricesDao } from "../dao/factory.dao.js";
import varsEnv from "../env/vars.env.js";
import { ApiError } from "../errors/Api.error.js";
import { sendEmailValidation } from "../utils/nodemailer.js";

const {SUPERIOR_PRIVILEGES} = varsEnv

class ProductsServices {
    async paginate ({ page, limit, category, sort, provider, price }) {
        const arrayPage = []
        //filter for categories or provider
        const allCategories = await productsDao.distinct('category')
        const allProvider = await productsDao.distinct('provider')
        //order for price
        if (price === 'Asc') sort = {price: -1}
        if (price === 'Dec') sort = {price: 1}

        const { docs,totalPages,hasPrevPage,prevPage,hasNextPage,nextPage} = await productsDao.paginate({page, limit, category, sort, provider})

        if (page > totalPages) throw new ApiError('Query error', 400)
        //for navigation button, max length = 10
        let start = Math.max(1, page - 5)
        let end = Math.min(totalPages, start + 9)
        for (let i = start; i <= end; i++) {
            arrayPage.push(i)
        }
        
        //The payload is due to the organization of the reaction components in react
        return { docs, allCategories, allProvider, pagination: {arrayPage, hasPrevPage, prevPage, hasNextPage, nextPage, totalPages} }
    }

    async get ({_id}) {
        const prod = await productsDao.get({_id})
        if (prod.length === 0) throw new ApiError(`Cart or product invalid`, 404)
        
        return prod
    }

    async post (prod) { //user in prod
        const existProd = await productsDao.get({code: prod.code})
        if (existProd.length !== 0) throw new ApiError(`Existing product`, 404)

        const newPrices = await pricesDao.post(prod.prices)
        prod.prices = newPrices._id

        const addProd = new ProductsDtoPost(prod) //add owner and status
        const newProd = await productsDao.post(addProd)
        
        return newProd
    }

    async uploadThumbnails({ thumbnails, user }) {
        if (thumbnails.length === 0) throw new ApiError('Upload invalid', 400)
        const path = []
        const endPath = 'C:/Users/lguil/OneDrive/Escritorio/Ddbase/public'
    
        thumbnails.forEach(image => {
            const dir = image.path.replace(/\\/g, '/')
            const pathImage = dir.replace(endPath, '')
            path.push(pathImage)
        })

        return path
    }
    

    async put ({_id, user}, update){
        const existProd = await this.get({_id}) //this.get control the bug

        if (user.email !== existProd[0].owner && user.role !== SUPERIOR_PRIVILEGES) throw new ApiError('No permission', 400)
        
        const up = await productsDao.put({_id}, update)
        
        return up
    }

    async delete ({_id, user}) {
        const existProd = await this.get({_id})//this.get control the bug

        if (user.email !== existProd[0].owner && user.role !== SUPERIOR_PRIVILEGES) throw new ApiError('No permission', 400)
        if (existProd[0].owner !== SUPERIOR_PRIVILEGES) sendEmailValidation({receiver: user.email, use: 'delProd', user: user.fullname, code: existProd[0].title})

        const del = await productsDao.put({_id}, {status: 'Disable'})
        
        return
    }
}

export const productServices = new ProductsServices()