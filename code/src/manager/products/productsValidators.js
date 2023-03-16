import { json } from "express"

export class ProductsValidators {

    constructor (products) {
        this.products = products
        this.validKeys = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnail']
    }

    async logicQuery (query) {
        try {
            //transform value limit to number
            const receive = Number(Object.values(query))

            //filter product
            const filteredProducts = this.products.filter(i => i.id <= receive)
            
            //exist limit?
            if (filteredProducts == 0) {return 'approved'}

            //return query
            return filteredProducts
        } catch (err) {return { error: `error in function logicQuery, is in /src/products/productsValidators.js ` }}

    }
    
    async validatorAdd (obj) {
        try {
            //keys and values
            const objKeys = Object.keys(obj)
            const objValues = Object.values(obj)

            //keys = object req?
            if (JSON.stringify(objKeys) !== JSON.stringify(this.validKeys)) {
                return { error: `Object has invalid keys, expected ${this.validKeys}` }
            }

            //values = object req?
            if ((typeof objValues[0] !== 'string') || (objValues[0] === '')) {return { error: 'Invalid type or missing title' }}
            if ((typeof objValues[1] !== 'string') || (objValues[1] === '')) {return { error: 'Invalid type or missing description' }}
            if ((typeof objValues[2] !== 'string') || (objValues[2] === '')) {return { error: 'Invalid type or missing code' }}
            if ((typeof objValues[3] !== 'number') || (objValues[3] === '')  || (objValues[3] <= 0)) {return { error: 'Invalid type or missing price' }}
            if ((typeof objValues[4] !== 'boolean') || (objValues[4] === '')) {return { error: 'Invalid type or missing status' }}
            if ((typeof objValues[5] !== 'number') || (objValues[5] === '') || (objValues[5] <= 0)) {return { error: 'Invalid type or missing stock' }}        
            if ((typeof objValues[6] !== 'string') || (objValues[6] === '')) {return { error: 'Invalid type or missing category' }}        
            if ((typeof objValues[7] !== 'object') || (objValues[7] === '')) {return { error: 'Invalid type or missing thumbnail' }}        
            
            //product add exist? (by code)
            const productExist = this.products.find(prod => prod.code === objValues[2])
            if (productExist) {return { error: `This code ${objValues[2]} existing` }}
            
            //first product?
            if(this.products.length === 0){obj.id = 1}
            if(this.products.length != 0){obj.id = this.products[this.products.length-1].id+1}
            
            //return approved
            return 'approved'
        } catch (err) {return { error: `error in function prodIdValidate, is in /src/products/productsValidators.js ` }}
    }

    async validatorUpdate (id, update) {
        try {
            //check keys
            const updateKeys = Object.keys(update)
            const hasInvalidKeys = updateKeys.some(key => !this.validKeys.includes(key))
            if (hasInvalidKeys) {return { error: `error, expected ${this.validKeys}`}}

            //check values
            for (let i = 0; i < updateKeys.length; i++) {
                const key = updateKeys[i]
                const updateValue = update[key]

                if ((key === 'title' && typeof updateValue !== 'string')) {return { error: `This value update is not valid for the ${this.validKeys[0]} field`}}
                if ((key === 'description' && typeof updateValue !== 'string')) {return { error: `This value update is not valid for the ${this.validKeys[1]} field`}}
                if ((key === 'code' && typeof updateValue !== 'string')) {return { error: `This value update is not valid for the ${this.validKeys[2]} field`}}
                if ((key === 'price' && typeof updateValue !== 'number')) {return { error: `This value update is not valid for the ${this.validKeys[3]} field`}}
                if ((key === 'status' && typeof updateValue !== 'boolean')) {return { error: `This value update is not valid for the ${this.validKeys[4]} field`}}
                if ((key === 'stock' && typeof updateValue !== 'number')) {return { error: `This value update is not valid for the ${this.validKeys[5]} field`}}
                if ((key === 'category' && typeof updateValue !== 'string')) {return { error: `This value update is not valid for the ${this.validKeys[6]} field`}}
                if ((key === 'thumbnail' && typeof updateValue !== 'string')) {return { error: `This value update is not valid for the ${this.validKeys[7]} field`}}

            }

            //exist product?
            const existProd = await this.prodIdValidate(id)
            if (typeof existProd !== 'object' ) { return {error: `The product whit id ${id}, does not exist`}}

            //return approved
            return 'approved'
        } catch (err) {return { error: `error in function validatorUpdate, is in /src/products/productsValidators.js ` }}
    }

    async prodIdValidate (id) {
        try {
            //id exist?
            const idExist = this.products.find((prod) => prod.id === JSON.parse(id))
            if (!idExist) {return `The product whit id ${id}, does not exist`}

            //return product
            return  idExist
        } catch (err) {return { error: `error in function prodIdValidate, is in /src/products/productsValidators.js ` }}
    }

    async prodDeleteValidate (id) {
        try {
            //exist product?
            const existProd = await this.prodIdValidate(id)
            if (typeof existProd !== 'object' ) { return {error: `The product whit id ${id}, does not exist`}}

            //return approved
            return 'approved'
        } catch (err) {return { error: `error in function prodDeleteValidate, is in /src/products/productsValidators.js ` }}
    }
} 