import { Router } from "express"
import { postCookieController } from "../controllers/cookies/postCookie.controller.js"
import { getCookieController } from "../controllers/cookies/getCookie.controller.js"

//variables
const router = new Router()

//view cookies for name
router.get('/api/cookies/:name', getCookieController)
//create cookies
router.post('/api/cookies/:typeCookie', postCookieController)

export default router