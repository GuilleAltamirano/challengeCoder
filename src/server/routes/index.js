import swaggerUiExpress from 'swagger-ui-express'
import {specs} from '../utils/swaggerOptions.js'
import { cartsRoute } from "./carts.router.js"
import { usersRoute } from "./users.router.js"
import { productsRoute } from "./products.router.js"
import { sessionsRoute } from "./sessions.router.js"
import { messagesRoute } from "./messages.router.js"
import commander from '../utils/commander.js'

export const routes = async (app) => {
    app
        .use('/api/users', await usersRoute.getRouter())
        .use('/api/carts', await cartsRoute.getRouter())
        .use('/api/products', await productsRoute.getRouter())
        .use('/api/sessions', await sessionsRoute.getRouter())
        .use('/api/messages', await messagesRoute.getRouter())
        
        if (commander.mode === 'dev') app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
}