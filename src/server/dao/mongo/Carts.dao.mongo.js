import { cartsModel } from "./models/carts.model.js"

export class CartsDaoMongo {
        constructor () {
                this.carts = cartsModel
        }

        async get (query) {
                return this.carts.find(query).lean()
        }

        async paginate ({ page, limit, product, sort }) {
                const filter = {}
                if (product) filter.product = product
        
                return this.carts.paginate(filter, {page, limit, sort, lean: true})
        }

        async post () {
                return this.carts.create({products: []})
        }

        async put({_id}, prod) {
                return this.carts.updateOne({_id}, {products: prod})
        }

}

export const cartsDaosMongo = new CartsDaoMongo()