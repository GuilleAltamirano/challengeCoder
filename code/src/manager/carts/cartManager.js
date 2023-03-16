import fs from "fs";

export class CartsManager {
    constructor (file) {
        this.file = file
        this.products = fs.readFileSync('./db/productsDb.json')
    }

    getCart () {
        if (fs.existsSync(this.file)) {
            const carts = fs.readFileSync(this.file)
            return JSON.parse(carts)
        }
        return []
    }

    async getCreateCart () {
        const allCarts = this.getCart()
        const newCart = new Object

        if (allCarts.length === 0) { newCart.id = 1 }
        if (allCarts.length != 0) { newCart.id = allCarts[allCarts.length-1].id+1 }

        newCart.products = []
        allCarts.push(newCart)

        fs.writeFileSync(this.file, JSON.stringify(allCarts, null, 2))
        
        return newCart
    }

    async getCartId (id) {
        const carts = this.getCart()
        if (id > carts.length) { return { error: `The id ${id} is greater, does not exist` } }
        const cart = carts.filter(i => i.id == id)
        return cart
    }

    async addProduct (cid, pid) {
        const carts = this.getCart()
        const products = JSON.parse(this.products)

        const addProduct = products.find(prod => prod.id == pid)
        const cart = carts.find(i => i.id == cid)
        
        if (!addProduct) { return { error: `product search with id ${pid} does not exist` } }
        if (!cart) { return { error: `cart search with id ${cid} does not exist` } }

        const cartProducts = cart.products
        const productId = addProduct.id
        
        const foundProduct = cartProducts.find(prod => prod.product === productId)
        if (foundProduct) {
            foundProduct.quantity += 1
            fs.writeFileSync(this.file, JSON.stringify(carts, null, 2))
            return cart
        }

        const newProduct = {"product": productId, "quantity": 1}

        cartProducts.push(newProduct)

        
        fs.writeFileSync(this.file, JSON.stringify(carts, null, 2))
        return cart
    }
}