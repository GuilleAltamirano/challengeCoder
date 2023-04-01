import { ProductManager } from "./products/productManager.js"

const productManager = new ProductManager('./src/db/productsDb.json')

//List products
export const ioServerProd = async (io, socket) => {
    socket.emit('products', await productManager.getProducts())
}
//Add new product
export const ioServerAddProd = async (io, socket) => {
    socket.on('newProduct', async newProduct => {
        await productManager.addProducts(newProduct)
    })
}
//Delete product
export const ioServerDelete = async (io, socket) => {
    socket.on('idProd', async id => {
        await productManager.deleteProduct(id)
    })
}
