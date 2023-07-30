import { productsModel } from "./models/products.model.js"

export class ProductsDaoMongo {
    constructor () {
        this.products = productsModel
    }

    async get(filter) {
        return this.products.find(filter)
    }

    async paginate ({ page, limit, category, sort, provider }) {
        const filter = {status: 'Active'}
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

    async put({_id}, update) { //do not destructuring update
        return this.products.updateOne({_id}, update)
    }

    async bulkWrite (operations) {
        return this.products.collection.bulkWrite(operations)
    }
}

export const productsDaosMongo = new ProductsDaoMongo()