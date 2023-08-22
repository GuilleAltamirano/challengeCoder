export class PurchaseDto {
    constructor (data) {
        this._id = data.product._id
        this.stock = data.product.stock
        this.price = data.product.prices.list_three
        this.status = data.product.status
        this.quantity = data.quantity
    }
}

export class ProductsTicketsDto {
    constructor (data) {
        this.product = data.product.title
        this.price_cost = data.product.prices.cost
        this.price_sale = data.product.prices.list_three
        this.quantity = data.quantity
    }
}