import { productsServices } from "../mongoDb/services/Products.services.js"

//var 
export const ioProducts = async (io, socket) => {
    //get products
    io.emit('products', await productsServices.getProducts())
}