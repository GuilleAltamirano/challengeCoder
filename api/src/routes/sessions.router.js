import { Router } from "express"
import { loginController, registerController, logoutController } from '../controllers/sessions.controller.js'

const router = new Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/logout', logoutController)

export default router