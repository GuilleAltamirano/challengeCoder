export class ProductsValidators {

    constructor (products) {
        this.products = products
    }

    async logicQuery (query) {
        const receive = Number(Object.values(query))
        console.log(receive)
        const filteredProducts = this.products.filter(i => i.id <= receive)
        if (filteredProducts == 0) {
            return this.products
        } else {return filteredProducts}
    }
    
    async validatorAdd ({ title, description, price, thumbnail, code, stock }) {

        // verify parameters
        if ((typeof title !== 'string') || (!title)) {return 'Invalid type or missing title'}
        if ((typeof description !== 'string') || (!description)) {return 'Invalid type or missing description'}
        if ((typeof price !== 'number') || (!price)) {return 'Invalid type or missing price'}
        if ((typeof thumbnail !== 'string') || (!thumbnail)) {return 'Invalid type or missing thumbnail'}
        if ((typeof code !== 'string') || (!code)) {return 'Code is required'}
        if ((typeof stock !== 'number') || (!stock)) {return 'Invalid type or missing stock'}

        // verify price and stock 
        if (price <= 0 || stock <= 0) {return 'Price or stock must be positive values'}

        //filter keys
        const keys = Object.keys({ title, description, price, thumbnail, code, stock });
        if (keys.length !== 6) {return 'Object has unexpected keys'}

        // return approved
        return 'approved'
    }

    async validatorUpdate (id, update) {
        // verify keys
        const keyVer = Object.keys(update);
        if (keyVer.includes("title") || keyVer.includes("description") || keyVer.includes("price") || keyVer.includes("stock")) {
            return "approved"
        }

        // verify that the ID is an integer
        if (!Number.isInteger(id)) {return 'ID must be an integer value'}

        // verify that an update object has been provided
        if (typeof update !== 'object') {return 'Update must be an object'}

        // verify that the update object does not have an ID field
        if (update.hasOwnProperty('id')) {return 'Update cannot contain an ID field'}

        // return invalid
        return 'product update is invalid'
    }
} 