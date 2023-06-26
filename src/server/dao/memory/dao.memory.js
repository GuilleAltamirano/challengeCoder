import { ApiError } from "../../errors/Api.error.js"

export class daoMemory {
    constructor(data) {
        this.users = []
        this.products = []
        this.carts = []

        if (data !== 'products') {
        this.date = data === 'users' ? this.users : this.carts;
        } else this.date = this.products
    }

    async get() {
        return this.date
    }

    async paginate ({ page, limit, filter, sort }) {
        // docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage
        return this.date
    }

    async post(data) {
        this.date.push(data)
        return this.date
    }

    async put(_id, newData) {
        let existData = this.date.find(u => u._id === _id)
        if (!existData) {
        throw new ApiError("Data does not exist")
        }
        Object.assign(existData, newData)
        return this.date
    }
}

export const productsDaoMemory = new daoMemory('products')
export const usersDaoMemory = new daoMemory('users')
export const cartsDaoMemory = new daoMemory('carts')