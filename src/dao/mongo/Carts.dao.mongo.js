import { cartsModel } from "./models/carts.model.js"

export class CartsDaoMongo {
        constructor () {
                this.carts = cartsModel
        }

        async get (query) {
                if(!query) return this.carts.find().lean()
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

        async put(id, prod) {
                return this.carts.updateOne(id, prod)
        }

}

export const cartsDaosMongo = new CartsDaoMongo()