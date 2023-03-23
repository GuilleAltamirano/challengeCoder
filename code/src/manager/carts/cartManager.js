import fs from "fs";

export class CartsManager {
    constructor (file) {
        this.file = file
        this.products = fs.readFileSync('./src/db/productsDb.json')
    }

    getCart () {
        try {
            if (fs.existsSync(this.file)) {
                const carts = fs.readFileSync(this.file)
                return JSON.parse(carts)
            }
            return []
        } catch (err) {return { error: `error in function getCart, is in /src/manager/carts/cartManager.js ` }}
    }

    async getCreateCart () {
        try {
            //create object
            const allCarts = this.getCart()
            const newCart = new Object
            //cart first?
            if (allCarts.length === 0) { newCart.id = 1 }
            if (allCarts.length != 0) { newCart.id = allCarts[allCarts.length-1].id+1 }
            //add cart
            newCart.products = []
            allCarts.push(newCart)
            //writeFile
            fs.writeFileSync(this.file, JSON.stringify(allCarts, null, 2))
            //return carts with newCart
            return newCart
        } catch (err) {return { error: `error in function getCreateCart, is in /src/manager/carts/cartManager.js ` }}
    }

    async getCartId (id) {
        try {
            //import carts
            const carts = this.getCart()
            //id exist?
            if (id > carts.length) { return { error: `The id ${id} is greater, does not exist` } }
            //filter cart
            const cart = carts.filter(i => i.id == id)
            //return cart with id
            return cart
        } catch (err) {return { error: `error in function getCartId, is in /src/manager/carts/cartManager.js ` }}
    }

    async addProduct (cid, pid) {
        try {
            //import carts and products
            const carts = this.getCart()
            const products = JSON.parse(this.products)
            //id product exist?
            if (pid > products.length) { return { error: `The id ${pid} is greater, does not exist` } }
            //filter product.id and cart.id
            const addProduct = products.find(prod => prod.id == pid)
            const cart = carts.find(i => i.id == cid)
            //exist cart and product?
            if (!addProduct) { return { error: `product search with id ${pid} does not exist` } }
            if (!cart) { return { error: `cart search with id ${cid} does not exist` } }
            //cart to add product
            const cartProducts = cart.products
            //just id
            const productId = addProduct.id
            //product add exist?
            const foundProduct = cartProducts.find(prod => prod.product === productId)
            if (foundProduct) {
                //quantity >= stock
                if (foundProduct.quantity >= addProduct.stock) {return { error: `Stock the product ${addProduct.stock} is small to quantity ${foundProduct.quantity += 1}` }}
                //add quantity
                foundProduct.quantity += 1
                //writeFile
                fs.writeFileSync(this.file, JSON.stringify(carts, null, 2))
                //return cart with product add
                return cart
            }
            //add newProduct Non-existing product
            const newProduct = {"product": productId, "quantity": 1}
            //update cart with new product
            cartProducts.push(newProduct)
            //writeFile
            fs.writeFileSync(this.file, JSON.stringify(carts, null, 2))
            //return cart updated
            return cart
        } catch (err) {return { error: `error in function addProduct, is in /src/manager/carts/cartManager.js ` }}
    }
}