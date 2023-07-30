import { pricesModel } from "./models/prices.model.js"

class PricesDaoMongo {
    constructor () {
        this.prices = pricesModel
    }

    async get (filter) {
        return this.prices.find(filter)
    }

    async post (prices) {
        return this.prices.create(prices)
    }

    async put ({_id}, update) {
        return this.prices.updateOne({_id}, update)
    }
}

export const pricesDaoMongo = new PricesDaoMongo()