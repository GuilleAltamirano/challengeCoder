import { productsServices } from "../mongoDb/services/Products.services.js"

//var

export const ioProducts = async (io, socket) => {
    try {
        //product 
        const products = await productsServices.getProducts()
        //get products
        io.emit('products', products)
        //newProduct
        socket.on('newProduct', prod => {
            socket.broadcast.emit('newProduct', prod)
        })
        socket.on('delProd', pid => {
            socket.broadcast.emit('delProd', pid)
        })
    } catch (err) {console.error(err)}
}