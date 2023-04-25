import handlebars from "express-handlebars"
import { router } from '../routes/index.js'
import {__dirname} from "../utils/utils.js"
import { errHandler } from "../middlewares/errHandler.middlewares.js"

export const appConfig = async (app, express) => {
    // config
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(__dirname + '../../public'))
    //handlebars
    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + '../views')
    app.set('view engine', 'handlebars')

    //routes
    app.use(router)

    //error
    app.use(errHandler)
}