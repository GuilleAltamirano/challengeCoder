import { PurchaseDto } from "../dao/DTOs/carts.dto.js"
import { cartsDao, productsDao, ticketsDao, usersDao } from "../dao/factory.dao.js"
import { ApiError } from "../errors/Api.error.js"

class CartsServices {
    async paginate (queryParams) {
        const { page, limit, product, sort } = queryParams
        const { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage } = await cartsDao.paginate({ page, limit, product, sort })
        if (page > totalPages) throw new ApiError('Query error', 400)
        return { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage }
    }

    async get (filter) {
        if (!filter) return await cartsDao.get()
        const res = await cartsDao.get(filter)
        if (!res) {throw new ApiError(`cart or product invalid`, 404)}
        return res[0].products
    }

    async post () {
        const newCart = await cartsDao.post()
        return newCart
    }

    async put (data) {
        const {_id, products} = data
        const updated = await cartsDao.put({_id, products})
        return
    }

    async postProdInCart (data) {
        const {cid, prod} = data

        const prodsInCart = await this.get({_id: cid})
        const existProdInCart = prodsInCart.find(products => products.product._id.equals(prod[0]._id))//valid product existence in cart

        if (!existProdInCart){
            const addProd = {product: prod[0]._id, quantity: 1}
            prodsInCart.push(addProd)
            const updated = await cartsDao.put({"_id": cid}, {"products": prodsInCart})
            return updated
        }

        if (existProdInCart.quantity >= prod[0].stock) {throw new ApiError(`Stock product is small to quantity`, 404)}

        existProdInCart.quantity += 1

        const updated = await cartsDao.put({"_id": cid}, {"products": prodsInCart})

        return updated
    }

    async postPurchase (cid) {
        const user = await usersDao.get({cart: cid})
        if (user[0].cart.length === 0) throw new ApiError('Cart invalid or empty', 400)
        const products = user[0].cart.products
        let acu = 0 //total purchase
        const success = [] //products to purchase
        const updateProds = [] //products to update stock
        for (let prod = 0; prod < products.length; prod++) {
            const {_id, stock, price, quantity, status} = new PurchaseDto(products[prod])
            if ((quantity > stock) || !status) continue
            success.push(_id)
            acu += quantity * price
            updateProds.push({
                updateOne: { //update new stock for product
                    filter: {_id},
                    update: { $inc: { stock: -quantity } }
                }
            })
        }
        const updateManyProds = await productsDao.bulkWrite(updateProds) //update stocks all products
        const refuseProducts = products.filter(prod => !success.includes(prod.product._id)) //failed purchase
        const updateCart = await this.put({_id: cid, products: refuseProducts}) //update cart with products refused
        if (success.length === 0) throw new ApiError('Products invalid', 400)
        const ticket = await ticketsDao.post({amount: acu, purchaser: user[0].email})
        return {ticket, refuseProducts}
    }

    async putQtyProd (data) {
        const {cid, pid, qty} = data
        const cart = await this.get({_id: cid})
        const existProdInCart = cart.find(i => i.product._id.equals(pid))

        if (!existProdInCart) throw new ApiError('product does not exist in cart', 400)
        existProdInCart.quantity = qty

        await this.put({_id: cid, products: cart})

        return cart
    }

    async delProdInCart (data) {
        const {cid, pid} = data
        const cart = await this.get({_id: cid}) //return cart.products
        const upProds = cart.filter(prod => !prod.product._id.equals(pid))
        await this.put({_id: cid, products: upProds})
        return upProds
    }
}

export const cartsServices = new CartsServices()