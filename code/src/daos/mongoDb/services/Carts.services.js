import { isValidObjectId } from "mongoose"
import { cartsModel } from "../models/carts.models.js"

class CartsServices {
    
    constructor (carts) {
        this.carts = carts
    }

    async getCarts (query) {
        if(!query){return this.carts.find()}
        return this.carts.find(query)
    }

    async cartsById (id) {
        //is valid?
        if (!isValidObjectId(id)){return undefined}
        //ok
        return this.carts.findById(id)
    }

    async createCart () {
        return this.carts.create({products: []})
    }

    async addProductCart (id, prod) {
        return this.carts.updateOne(id, prod)
    }

}

export const cartsServices = new CartsServices(cartsModel)