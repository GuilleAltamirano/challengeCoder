import { usersModel } from "./models/users.model.js"

export class UsersDaoMongo {
    constructor () {
        this.users = usersModel
    }

    async paginate ({role, status, verified, page}) {
        const filter = {}
        if (role) filter.role = role
        if (status) filter.status = status
        if (verified) filter.verified = verified
        
        return this.users.paginate(filter, {page, lean: true})
    }

    async get (filter) {
        return this.users.find(filter).populate('cart')
    }

    async post (user) {
        return this.users.create(user)
    }
    
    async put({_id}, user) {
        return this.users.updateOne({_id}, user)
    }

    async delete (filter) {
        return this.users.deleteOne(filter)
    }

    async deleteUsers (today) {
        return this.users.deleteMany({ last__connection: {$lte: today}})
    }
}

export const userDaosMongo = new UsersDaoMongo()