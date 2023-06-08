import { productsModel } from "./models/products.model.js"

export class ProductsDaoMongo {
    
    constructor () {
        this.products = productsModel
    }

    async get(filter) {
        if (filter) return this.products.find(filter).lean()
        
        return this.products.find().lean()
    }

    async paginate ({ page, limit, category, status, sort }) {
        const filter = {}
        
        if (category) filter.category = category
        if (status) filter.status = status

        return this.products.paginate(filter, {page, limit, sort, lean: true})
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