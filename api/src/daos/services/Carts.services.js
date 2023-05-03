import { cartsModel } from "../models/carts.model.js"

class CartsServices {
        constructor (carts) {
                this.carts = carts
        }

        async getCarts (query) {
                if(!query) return this.carts.find()
                return this.carts.find(query)
        }

        async postCart () {
                return this.carts.create({products: []})
        }

        async putCart (id, prod) {
                return this.carts.updateOne(id, prod)
        }

}

export const cartsServices = new CartsServices(cartsModel)