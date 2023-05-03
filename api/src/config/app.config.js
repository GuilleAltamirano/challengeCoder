import { __dirname } from "../utils/utils.js"
import routes from "../routes/index.js"
import {errorMiddlewares} from '../middlewares/Errors.middleware.js'
import session from "express-session"
import create from "connect-mongo"
import { engine } from "express-handlebars"

export const appConfig = async (app, express) => {
    // config
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(__dirname + '../../public'))
    //handlebars
    app.engine('handlebars', engine())
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')
    //session
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
    //router
    app.use(routes)

    //middlewares
    app.use(errorMiddlewares)
}