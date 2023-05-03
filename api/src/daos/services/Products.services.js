import { productsModel } from "../models/products.model.js"

class ProductsServices {
    
    constructor (products) {
        this.products = products
    }

    async getProducts (filter) {
        if (filter) return this.products.find(filter).lean()
        
        return this.products.find().lean()
    }

    async productsPaginate ({ page, limit, category, status, sort }) {
        const filter = {}
        
        if (category) filter.category = category
        if (status) filter.status = status

        return this.products.paginate(filter, {page, limit, sort, lean: true})
    }

    async postProduct (product) {
        return this.products.create(product)
    }

    async putProduct (id, update) {
        return this.products.updateOne(id, update)
    }
}

export const productsServices = new ProductsServices(productsModel)