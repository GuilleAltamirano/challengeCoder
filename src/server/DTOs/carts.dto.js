export class PurchaseDto {
    constructor (data) {
        this._id = data.product._id
        this.stock = data.product.stock
        this.price = data.product.price
        this.status = data.product.status
        this.quantity = data.quantity
    }
}