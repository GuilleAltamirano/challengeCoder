export class CartsValidators {
    
    constructor(carts) {
        this.carts = carts
    }

    async cartsVer () {
        for (let i = 0; i < this.carts.length; i++) {
            const element = this.carts[i]
            if ( element.products.length === 0 ) { return element }
        }
        
        return 'success'
    }

    async idVerificator (id) {
        try {
            const cid = JSON.parse(id)
            if ((typeof cid !== 'number') || (!cid) || (cid < 1)) { return { error: `Type the id ${id}, is invalid` } }
        } catch (error) {
            return { error: `The value ${id} is not valid` }
        }
        
        return 'success'
    }

    async addVerificator (cidd, pidd) {
        const cid = await this.idVerificator(cidd)
        const pid = await this.idVerificator(pidd)
        if (cid !== 'success') {return cid }
        if (pid !== 'success') {return pid}
        return 'hola'
    }
}