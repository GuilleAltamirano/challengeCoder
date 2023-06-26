import { productsModel } from "./models/products.model.js"

export class ProductsDaoMongo {
    
    constructor () {
        this.products = productsModel
    }

    async get(filter) {
        if (filter) return this.products.find(filter).lean()
        
        return this.products.find().lean()
    }

    async paginate ({ page, limit, category, sort, provider }) {
        const filter = {}
        filter.status = true
        if (category) filter.category = category
        if (provider) filter.title = provider
        return this.products.paginate(filter, {page, limit, sort, lean: true})
    }

    async distinct (filter) {
        return this.products.distinct(filter)
    }
    
    async post (product) {
        return this.products.create(product)
    }

    async put(id, update) {
        return this.products.updateOne(id, update)
    }

    async bulkWrite (operations) {
        return this.products.collection.bulkWrite(operations)
    }
}

export const productsDaosMongo = new ProductsDaoMongo()