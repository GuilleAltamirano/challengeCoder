import fs from "fs";

class ProductManager {
    constructor(file){
        this.file = file
    }

    async getProducts() {
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

    async addProducts (obj) {
        try {
            //import products
            const allProducts = await this.getProducts()
            
            //first product?
            if(allProducts.length === 0){obj.id = 1}
            if(allProducts.length != 0){obj.id = allProducts[allProducts.length-1].id+1}
            
            //writeFile updated
            allProducts.push(obj)
            fs.writeFileSync(this.file, JSON.stringify(allProducts, null, 2))

            //return
            return obj
        } catch (err) {return { error: `error in function getAddProducts, is in /src/manager/products/productManager.js ` }}
    }

    async productById(id) {
        try {
            //import products
            const allProducts = await this.getProducts()
            //id product
            const product = allProducts.find((prod) => prod.id === JSON.parse(id))
            //return success
            return product
        } catch (err) {return { error: `error in function getProductById, is in /src/manager/products/productManager.js ` }}
    }

    async productUp(id, update){
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

    async deleteProduct(id) {
        try {
            //import all products
            const products = await this.getProducts()
            //Filter products don't delete
            let productsUp = products.filter(prod => prod.id != id)
            //product to delete
            let productsDelete = products.find((prod) => prod.id == id)
            //Disable view product
            productsDelete.status = false
            //push new value
            productsUp.push(productsDelete)
            //writeFile
            fs.writeFileSync(this.file, JSON.stringify(productsUp, null, 2))
            //return
            return { success: `product deleted`}
        } catch (err) {return { error: `error in function getDeleteProduct, is in /src/manager/products/productManager.js ` }}
    }
}

export const productManager = new ProductManager('../db/productsDb.json')