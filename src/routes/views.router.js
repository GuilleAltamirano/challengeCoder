// import { cartController, indexController } from "../controllers/views.controller.js"
// import Routers from "./router.js"

// class ViewsRouter extends Routers {
//     constructor () {
//         super()
//     }

//     async init(){
//         await this.get('/login',['PUBLIC'], async (req, res, next) => res.renderPage('login'))
//         await this.get('/register',['PUBLIC'], async (req, res, next) => res.renderPage('register'))
//         await this.get('/profile',['PUBLIC'], async (req, res, next) => res.renderPage('profile', req.user.user))
//         await this.get('/',['PUBLIC'], indexController)
//         await this.get('/cart',['USER'], cartController)
//     }
// }

// export const viewsRoute = new ViewsRouter()