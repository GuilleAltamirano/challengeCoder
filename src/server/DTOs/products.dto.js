import varsEnv from "../env/vars.env.js"

const {ROLE_USER_ADVANCED, STATUS_PRODUCTS} = varsEnv

export class ProductsDtoPost {
    constructor (product) {
        this.title = product.title
        this.description = product.description
        this.code = product.code
        this.prices = product.prices
        this.status = STATUS_PRODUCTS
        this.stock = product.stock
        this.category = product.category
        this.provider = product.provider
        this.thumbnails = product.thumbnails
        if (product.user.role === ROLE_USER_ADVANCED) this.owner = product.user.email
        if (product.promotion.length > 0) this.promotion = product.promotion
    }
}