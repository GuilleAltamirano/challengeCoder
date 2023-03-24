export class CartsValidators {
    
    constructor(carts) {
        this.carts = carts
    }

    async cartsVer () {
        try {
            //last cart it is empty?
            for (let i = 0; i < this.carts.length; i++) {
                const element = this.carts[i]
                //return cart last
                if ( element.products.length === 0 ) { return element }
            }
            //return status
            return 'success'
        } catch (err) {return { error: `error in function cartsVer, is in /src/manager/carts/cartsValidators.js ` }}

    }

    async idVerificator (id) {
        try {
            //parse fails?
            try {
                const cid = JSON.parse(id)
                //type id is correct
                if ((typeof cid !== 'number') || (!cid) || (cid < 1)) { return { error: `Type the id ${id}, is not invalid` } }
            } catch (error) {
                //type id invalid
                return { error: `The value ${id} is not valid` }
            }
            //return status
            return 'success'
        } catch (err) {return { error: `error in function idVerificator, is in /src/manager/carts/cartsValidators.js ` }}
    }

    async addVerificator (cidd, pidd) {
        try {
            //Check id's
            const cid = await this.idVerificator(cidd)
            const pid = await this.idVerificator(pidd)
            if (cid !== 'success') {return cid }
            if (pid !== 'success') {return pid}
            if (cid > this.carts.length) { return { error: `The id ${id} is greater, does not exist` } }
            //return status
            return 'success'
        } catch (err) {return { error: `error in function addVerificator, is in /src/manager/carts/cartsValidators.js ` }}
    }
}