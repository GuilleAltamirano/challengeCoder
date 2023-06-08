import { mongoConfig } from "../config/Mongo.config.js";
import { PERSISTENCE } from "../env/vars.env.js";
import { cartsDaoMemory, productsDaoMemory, usersDaoMemory } from "./memory/dao.memory.js";
import { cartsDaosMongo } from "./mongo/Carts.dao.mongo.js";
import { messagesDaosMongo } from "./mongo/Messages.dao.mongo.js";
import { productsDaosMongo } from "./mongo/Products.dao.mongo.js";
import { ticketsDaoMongo } from "./mongo/Tickets.dao.mongo.js";
import { userDaosMongo } from "./mongo/Users.dao.mongo.js";

export let productsDao, cartsDao, usersDao, messagesDao, ticketsDao

switch (PERSISTENCE) {
    case 'MONGO':
        await mongoConfig()
        productsDao = productsDaosMongo
        cartsDao = cartsDaosMongo
        usersDao = userDaosMongo
        messagesDao = messagesDaosMongo
        ticketsDao = ticketsDaoMongo
        break;

    case 'MEMORY':
        productsDao = productsDaoMemory
        cartsDao = cartsDaoMemory
        usersDao = usersDaoMemory
        break;

    default:
        productsDao = productsDaosMongo
        cartsDao = cartsDaosMongo
        usersDao = userDaosMongo
        break;
}