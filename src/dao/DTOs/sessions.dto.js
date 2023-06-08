import { EMAIL_ADMIN } from "../../env/vars.env.js"

export class SessionsDto {
    constructor (data) {
        if (data === 'admin') {
            this.fullname = data
            this.email = EMAIL_ADMIN
            this.role = data
            return
        }

        this.fullname = `${data.first_name} ${data.last_name}`
        this.email = data.email
        this.role = data.role
        this.cart = data.cart
    }
}