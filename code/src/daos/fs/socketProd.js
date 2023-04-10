import { productsServices } from "../mongoDb/services/Products.services.js"

//var 
export const ioProducts = async (io, socket) => {
    //get products
    io.emit('products', await productsServices.getProducts())
    //add product
    socket.on('newProduct', async newProduct => {
        await productsServices.addProduct(newProduct)
    })
    //delete product
    socket.on('idProd', async pid => {
        await productsServices.deleteProduct(pid)
    })
}