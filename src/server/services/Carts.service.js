import { PurchaseDto } from "../DTOs/carts.dto.js"
import { cartsDao, productsDao, ticketsDao, usersDao } from "../dao/factory.dao.js"
import { ApiError } from "../errors/Api.error.js"
import { productServices } from "./Products.service.js"
import varsEnv from "../env/vars.env.js"

const {STATUS_PRODUCTS, SUPERIOR_PRIVILEGES} = varsEnv

class CartsServices {
    async paginate ({ page, limit, product, sort }) {
        const { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage } = await cartsDao.paginate({ page, limit, product, sort })
        
        if (page > totalPages) throw new ApiError('Query error', 400)
        
        return { docs, totalPages, hasPrevPage, prevPage, hasNextPage,nextPage }
    }

    async get ({_id}) {
        const result = await cartsDao.get({_id})
        
        if (result.length === 0) {throw new ApiError(`cart or product invalid`, 404)}
        
        return result[0].products
    }

    async post () {
        
        const newCart = await cartsDao.post()
        
        return newCart
    }

    async put ({_id, products}) {
        const cart = await this.get({_id}) //control the bug

        const updated = await cartsDao.put({_id}, products)

        return
    }

    async postProdInCart ({cid, pid, user}) {
        const prodsInCart = await this.get({_id: cid}) //control the bug
        const prod = await productServices.get({_id: pid}) //valid product existence
        if (prod[0].status !== STATUS_PRODUCTS || !prod[0] || prod.length === 0) throw new ApiError('Product invalid', 400)
        //owner != Admin cannot buy your product
        if (prod[0].owner === user.email && prod[0].owner !== SUPERIOR_PRIVILEGES) throw new ApiError('No permission', 400)

        //valid product existence in cart
        const existProdInCart = prodsInCart.find(products => products.product._id.equals(prod[0]._id))
        //product no exist in cart, add product with quantity = 1
        if (!existProdInCart){
            const addProd = {product: prod[0]._id, quantity: 1}
            prodsInCart.push(addProd)
            const updated = await this.put({_id: cid, products: prodsInCart})

            return updated
        }
        //validation
        if (existProdInCart.quantity >= prod[0].stock) {throw new ApiError(`Stock product is small to quantity`, 404)}
        //operation quantity and update cart
        existProdInCart.quantity += 1
        const updated = await this.put({_id: cid, products: prodsInCart})

        return updated
    }

    async postPurchase ({cid}) {
        //search user and cart
        const user = await usersDao.get({cart: {_id: cid}})
        const cart = await this.get({_id: cid})
        
        if (cart.length === 0 || user.length === 0) throw new ApiError('Cart invalid or empty', 400)
        
        const products = user[0].cart.products
        let totalPurchase = 0 //total purchase
        const success = [] //products to purchase
        const updateProds = [] //products to update stock

        for (let prod = 0; prod < products.length; prod++) {
            const {_id, stock, price, quantity, status} = new PurchaseDto(products[prod])
            
            if ((quantity > stock) || status !== STATUS_PRODUCTS) continue
            
            success.push(_id)
            totalPurchase += quantity * price
            updateProds.push({
                updateOne: { //update new stock for product
                    filter: {_id},
                    update: { $inc: { stock: -quantity } }
                }
            })
        }
        if (success.length === 0) throw new ApiError('Products invalid', 400)

        const updateManyProds = await productsDao.bulkWrite(updateProds) //update stocks all products
        const refuseProducts = products.filter(prod => !success.includes(prod.product._id)) //failed purchase
        const updateCart = await this.put({_id: cid, products: refuseProducts}) //update cart with products refused
        
        const ticket = await ticketsDao.post({amount: totalPurchase, purchaser: user[0].email, products: success})
        
        return {ticket, refuseProducts}
    }

    async putQtyProd ({cid, pid, qty}) {
        const prod = await productServices.get({_id: pid}) //valid product existence
        if (prod[0].stock < qty || prod[0].status !== STATUS_PRODUCTS) throw new ApiError('Quantity or product invalid', 400)
        //validations
        const cart = await this.get({_id: cid})
        if (cart.length === 0) throw new ApiError('Cart invalid', 400)
        const existProdInCart = cart.find(i => i.product._id.equals(pid))
        if (!existProdInCart) throw new ApiError('product does not exist in cart', 400)
        //update quantity
        existProdInCart.quantity = qty
        const update = await this.put({_id: cid, products: cart})

        return cart
    }

    async delProdInCart ({cid, pid}) {
        const cart = await this.get({_id: cid}) //verify existence of and return cart.products
        
        const upProds = cart.filter(prod => !prod.product._id.equals(pid))
        const update = await this.put({_id: cid, products: upProds})
        
        return upProds
    }
}

export const cartsServices = new CartsServices()