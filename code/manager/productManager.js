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
        const allProducts = await this.getProducts()
        const productExist = allProducts.find(prod => prod.code === code)
        if (productExist) {
            return console.error(`This code ${code} existing`)
        }
        const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        };
        if(allProducts.length===0){
            newProduct.id=1;
        }else{
            newProduct.id = allProducts[allProducts.length-1].id+1; 
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.file, JSON.stringify(allProducts))
        return newProduct
    }

    async getProductById(id) {
        const allProducts = await this.getProducts()
        const idExist = allProducts.find((prod) => prod.id === id);
        if (!idExist) {
            return console.error(`The product whit id ${id}, does not exist`)
        }
        return idExist
    }

    async getProductUp(id, update){
        let existProd = await this.getProductById(id)
        if (existProd != undefined) {
            const products = await this.getProducts()
            let productsUp = products.filter((prod) => prod.id != id)
            let productUp = {...existProd, ...update, id: id}
            productsUp.push(productUp)
            fs.writeFileSync(this.file, JSON.stringify(productsUp))
            return productUp
        }
        return 'Product not exist'
    }

    async getDeleteProduct(id) {
        let existProd = await this.getProductById(id)
        if (existProd != undefined) {
            const products = await this.getProducts()
            let productsUp = products.filter((prod) => prod.id != id)
            fs.writeFileSync(this.file, JSON.stringify(productsUp))
            return 'product Deleted'
        }
        return 'product not exist'
    }
}