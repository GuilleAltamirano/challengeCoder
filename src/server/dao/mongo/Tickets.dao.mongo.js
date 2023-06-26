import { ticketsModel } from "./models/tickets.model.js"

class TicketsDaoMongo {
    constructor () {
        this.tickets = ticketsModel
    }

    async get (data) {
        if (!data) return this.tickets.find()
        return this.tickets.find(data)
    }

    async post (data) {
        return this.tickets.create(data)
    }
}

export const ticketsDaoMongo = new TicketsDaoMongo()