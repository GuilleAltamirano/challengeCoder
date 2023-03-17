import express from "express"
import handlebars from "express-handlebars"
import {__dirname} from "./dirName.js"
import productsRouter from "./src/routes/routerProducts/routerProducts.js"
import cartsRouter from './src/routes/routerCarts/routerCarts.js'


//variables
const app = express()
const PORT = process.env.PORT || 8080


//appUse
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars')

//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

//Server Run
app.listen(PORT, () => {
    console.log(`Server HTTP run in PORT ${PORT}`)
})