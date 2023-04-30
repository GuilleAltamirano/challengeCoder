import { Router } from "express"
import { deleteSessionController, postLoginController, postSignupController } from "../controllers/sessions/postSession.controller.js"

//variables
const router = new Router() 

//login
router.post('/login', postLoginController)
//sign up
router.post('/register', postSignupController)
//exist session?
// router.get('/', getSessionController)
//logout
router.delete('/', deleteSessionController)

export default router