import { cartsRoute } from "./carts.router.js"
import { usersRoute } from "./users.router.js"
import { productsRoute } from "./products.router.js"
import { sessionsRoute } from "./sessions.router.js"
import { messagesRoute } from "./messages.router.js"
import { testingRouter } from "./testing.router.js"

export const routes = async (app) => {
    app
        .use('/api/users', await usersRoute.getRouter())
        .use('/api/carts', await cartsRoute.getRouter())
        .use('/api/products', await productsRoute.getRouter())
        .use('/api/sessions', await sessionsRoute.getRouter())
        .use('/api/messages', await messagesRoute.getRouter())
        .use('/api/testing', await testingRouter.getRouter())
}