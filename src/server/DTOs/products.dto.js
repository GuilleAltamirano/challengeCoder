export class ProductsDtoPost {
    constructor (product) {
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.prices = product.prices
        this.status = 'Active'
        this.stock = product.stock
        this.category = product.category
        this.thumbnails = product.thumbnails
        if (product.user.role === 'PREMIUM') this.owner = product.user.email
    }
}