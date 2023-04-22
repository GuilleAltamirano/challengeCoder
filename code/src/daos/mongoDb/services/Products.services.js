import { isValidObjectId } from "mongoose"
import { productsModel } from "../models/products.models.js"

class ProductsServices {
    constructor (products) {
        this.products = products
    }

    async getProducts (filter) {
        //filter?
        if (filter) {return this.products.find(filter).lean()}
        //no filter
        return this.products.find().lean()
    }

    async productsPaginate ({ page, limit, category, sort }) {
        const query = category ? { $and: [{ status: true }, { category }] } : { status: true }
        return this.products.paginate(query, {page, limit, sort, lean: true})
    }

    async getProductById (id) {
        //is valid?
        if (!isValidObjectId(id)){return undefined}
        //ok
        return this.products.findById(id)
    }

    async addProduct (product) {
        return this.products.create(product)
    }

    async putProduct (id, update) {
        console.log(update);
        return this.products.updateOne(id, update)
    }

    async deleteProduct (id) {
        return this.products.deleteOne(id)
    }
}

export const productsServices = new ProductsServices(productsModel)