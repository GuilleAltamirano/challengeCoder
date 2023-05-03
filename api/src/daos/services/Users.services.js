import { usersModel } from "../models/users.model.js"

class Users {
    constructor (users) {
        this.users = users
    }

    async getUsers (email) {
        return this.users.find(email).lean()
    }

    async postUser (user) {
        return this.users.create(user)
    }
}

export const userServices = new Users(usersModel)