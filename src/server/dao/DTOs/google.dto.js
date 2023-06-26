export class GoogleDto {
    constructor ({profile, cart}) {
        this.fullname = profile.displayName
        this.first_name = profile.given_name
        this.last_name = profile.family_name
        this.email = profile.email
        this.cart = cart._id
        this.age = undefined
        this.verified = profile.verified
    }
}