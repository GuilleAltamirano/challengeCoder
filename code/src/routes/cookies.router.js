import { Router } from "express"
import { postCookieController } from "../controllers/cookies/postCookie.controller.js"
import { getCookieController } from "../controllers/cookies/getCookie.controller.js"

const router = new Router() 

//view cookies for name
router.get('/:name', getCookieController)
//create cookies
router.post('/:typeCookie', postCookieController)

export default router