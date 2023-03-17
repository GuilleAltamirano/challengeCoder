import express, { Router } from "express"
import handlebars from "express-handlebars"

//variable
const app = express()
const realTimeProducts = new Router()

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

realTimeProducts.get('/', async (req, res) => {
    res.render('realTimeProducts')
})

export default realTimeProducts