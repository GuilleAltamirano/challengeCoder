import fs from "fs";

export class ProductManager {
    constructor(file){
        this.file = file
    }

    getProducts() {
        try {
            //exist the file?
            if (fs.existsSync(this.file)) {
                //products is all file
                let products = fs.readFileSync(this.file)
                //return all products
                return JSON.parse(products)
            }
            //File is does not exist, return array empty
            return []
        } catch (err) {return { error: `error in function getProducts, is in /src/manager/products/productManager.js ` }}
    }

    async getAddProducts (obj) {
        try {
            //import products
            const allProducts = await this.getProducts()

            //writeFile updated
            allProducts.push(obj)
            fs.writeFileSync(this.file, JSON.stringify(allProducts, null, 2))

            //return
            return obj
        } catch (err) {return { error: `error in function getAddProducts, is in /src/manager/products/productManager.js ` }}
    }

    async getProductById(id) {
        try {
            //import products
            const allProducts = await this.getProducts()
            //id product
            const product = allProducts.find((prod) => prod.id === JSON.parse(id))
            //return success
            return product
        } catch (err) {return { error: `error in function getProductById, is in /src/manager/products/productManager.js ` }}
    }

    async getProductUp(id, update){
        try {
            //Product to update
            const existProd = await this.getProductById(id)
            //import products
            const products = await this.getProducts()
            //all products without product to update
            const productsUp = products.filter((prod) => prod.id != id)
            //product to update
            const productUp = {...existProd, ...update, id: JSON.parse(id)}
            //add product to all products
            productsUp.push(productUp)
            //writeFile
            fs.writeFileSync(this.file, JSON.stringify(productsUp, null, 2))
            //return product updated
            return productUp
        } catch (err) {return { error: `error in function getProductUp, is in /src/manager/products/productManager.js ` }}

    }

    async getDeleteProduct(id) {
        try {
            //import all products
            const products = await this.getProducts()
            //All products without product to delete
            let productsUp = products.filter((prod) => prod.id != id)
            //writeFile
            fs.writeFileSync(this.file, JSON.stringify(productsUp, null, 2))
            //return
            return { success: `product deleted`}
        } catch (err) {return { error: `error in function getDeleteProduct, is in /src/manager/products/productManager.js ` }}
    }
}