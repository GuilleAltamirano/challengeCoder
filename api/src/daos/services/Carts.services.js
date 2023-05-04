import { cartsModel } from "../models/carts.model.js"

class CartsServices {
        constructor (carts) {
                this.carts = carts
        }

        async getCarts (query) {
                if(!query) return this.carts.find().lean()
                return this.carts.find(query).lean()
        }

        async postCart () {
                return this.carts.create({products: []})
        }

        async putCart (id, prod) {
                return this.carts.updateOne(id, prod)
        }

}

export const cartsServices = new CartsServices(cartsModel)