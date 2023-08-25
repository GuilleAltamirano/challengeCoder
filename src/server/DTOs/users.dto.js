export class UsersDto {
    constructor (data) {
        this.fullname = `${data.first_name} ${data.last_name}`
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
        this.age = data.age
        this.cart = data.cart
        this.password = data.password
    }
}

export class UsersPaginateDto {
    constructor (data) {
        this.fullname = data.fullname
        this.email = data.email
        this.role = data.role
        this.status = data.status
        this.email_verified = data.email_verified
        this.profile = data.profile
        this._id = data._id
    }
}