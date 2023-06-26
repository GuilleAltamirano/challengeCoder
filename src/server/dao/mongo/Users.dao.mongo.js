import { usersModel } from "./models/users.model.js"

export class UsersDaoMongo {
    constructor () {
        this.users = usersModel
    }

    async get (filter) {
        return this.users.find(filter).populate('cart')
    }

    async post (user) {
        return this.users.create(user)
    }
    
    async put(_id, user) {
        
        return this.users.updateOne({_id}, user)
    }
}

export const userDaosMongo = new UsersDaoMongo()