import { productsServices } from "../mongoDb/services/Products.services.js"

//var 
export const ioProducts = async (io, socket) => {
    try {
        //product 
        const products = await productsServices.getProducts()
        //get products
        return io.emit('products', await productsServices.getProducts())
    } catch (err) {console.error(err)}
}