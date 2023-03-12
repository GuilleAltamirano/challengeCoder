import fs from "fs";

export class ProductManager {
    constructor(file){
        this.file = file
    }

    getProducts() {
        if (fs.existsSync(this.file)) {
            let products = fs.readFileSync(this.file)
            return JSON.parse(products)
        }
        return []
    }

    async getAddProducts ({title, description, price, thumbnail, code, stock}) {
        //import products
        const allProducts = await this.getProducts()
            
        //product search exist?
        const productExist = allProducts.find(prod => prod.code === code)
        if (productExist) {return `This code ${code} existing`}
        
        //declaring new product
        const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        }
        //first product?
        if(allProducts.length === 0){newProduct.id=1}
        if(allProducts.length != 0){newProduct.id = allProducts[allProducts.length-1].id+1}
        
        //writeFile updated
        allProducts.push(newProduct)
        fs.writeFileSync(this.file, JSON.stringify(allProducts, null, 2))
        return newProduct
    }

    async getProductById(id) {
        const allProducts = await this.getProducts()
        const idExist = allProducts.find((prod) => prod.id === id)
        if (!idExist) {return `The product whit id ${id}, does not exist`}

        return idExist
    }

    async getProductUp(id, update){
        let existProd = await this.getProductById(id)
        if (existProd != undefined) {
            const products = await this.getProducts()
            let productsUp = products.filter((prod) => prod.id != id)
            let productUp = {...existProd, ...update, id: id}
            productsUp.push(productUp)
            fs.writeFileSync(this.file, JSON.stringify(productsUp, null, 2))
            return productUp
        }
        return 'Product not exist'
    }

    async getDeleteProduct(id) {
        let existProd = await this.getProductById(id)
        if (existProd != undefined) {
            const products = await this.getProducts()
            let productsUp = products.filter((prod) => prod.id != id)
            fs.writeFileSync(this.file, JSON.stringify(productsUp, null, 2))
            return 'product Deleted'
        }
        return 'product not exist'
    }
}