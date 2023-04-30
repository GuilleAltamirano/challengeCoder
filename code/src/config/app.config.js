import handlebars from "express-handlebars"
import create from "connect-mongo"
import { router } from '../routes/index.js'
import {__dirname} from "../utils/utils.js"
import { errHandler } from "../middlewares/errHandler.middlewares.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import {authMiddleware} from '../middlewares/auth.middleware.js'

export const appConfig = async (app, express) => {
    // config
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(__dirname + '../../public'))
    //handlebars
    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')

    //cookie
    app.use(cookieParser('y~iirv+sKB%F,h3HZim{7%Gpsk{=k}aW$5oa^KYfyeP34C9TPs'))

    //sessions
    app.use(session({
        store: new create({
            mongoUrl: "mongodb+srv://lguille:GrzBBTmDcPC3zVqJ@coder.barbhh9.mongodb.net/coder?retryWrites=true&w=majority",
            mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            ttl: 7200
        }),
        secret: 'a~d={99%Qo&BhPpkcAN9ed;-z=Muhs(=_co_,qo(LwJ49a2qV=', //key secret 
        resave: true, //keep session active
        saveUninitialized: true //save session even if empty
    }))

    //routes
    app.use(authMiddleware, router)

    //error
    app.use(errHandler)
}