import { productsServices } from "../../daos/mongoDb/services/Products.services.js"

//var

export const ioProducts = async (io, socket) => {
    try {
        //product 
        const products = await productsServices.getProducts({$and: [{status: true}, {stock: {$gt: 1}}]})
        //get products
        io.emit('products', products)
        //newProduct
        socket.on('newProduct', prod => {
            io.emit('newProduct', prod)
        })
        //delProduct
        socket.on('delProd', pid => {
            socket.broadcast.emit('delProd', pid)
        })
    } catch (err) {console.error(err)}
}