import { ProductManager } from "../products/productManager.js"

const productManager = new ProductManager('./src/db/productsDb.json')

export const ioServerProd = async (io, socket) => {
    socket.emit('products', await productManager.getProducts())
}

export const ioServerAddProd = async (io, socket) => {
    socket.on('newProduct', async newProduct => {
        await productManager.getAddProducts(newProduct)
    })
}

export const ioServerDelete = async (io, socket) => {
    socket.on('idProd', async id => {
        await productManager.getDeleteProduct(id)
    })
}
