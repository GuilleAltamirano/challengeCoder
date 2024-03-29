import { mongoConfig } from "../config/Mongo.config.js";
import varsEnv from "../env/vars.env.js";
import { cartsDaoMemory, productsDaoMemory, usersDaoMemory } from "./memory/dao.memory.js";
import { cartsDaosMongo } from "./mongo/Carts.dao.mongo.js";
import { messagesDaosMongo } from "./mongo/Messages.dao.mongo.js";
import { productsDaosMongo } from "./mongo/Products.dao.mongo.js";
import { ticketsDaoMongo } from "./mongo/Tickets.dao.mongo.js";
import { userDaosMongo } from "./mongo/Users.dao.mongo.js";
import { pricesDaoMongo } from "./mongo/Prices.dao.mongo.js";

export let productsDao, cartsDao, usersDao, messagesDao, ticketsDao, pricesDao

switch (varsEnv.PERSISTENCE) {
    case 'MONGO':
        await mongoConfig()
        productsDao = productsDaosMongo
        cartsDao = cartsDaosMongo
        usersDao = userDaosMongo
        messagesDao = messagesDaosMongo
        ticketsDao = ticketsDaoMongo
        pricesDao = pricesDaoMongo
        break;

    case 'MEMORY':
        productsDao = productsDaoMemory
        cartsDao = cartsDaoMemory
        usersDao = usersDaoMemory
        break;

    default:
        await mongoConfig()
        productsDao = productsDaosMongo
        cartsDao = cartsDaosMongo
        usersDao = userDaosMongo
        break;
}