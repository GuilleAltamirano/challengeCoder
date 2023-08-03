import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES, EMAIL_ADMIN} = varsEnv

export class SessionsDto {
    constructor (data) {
        if (data === SUPERIOR_PRIVILEGES) {
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