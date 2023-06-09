import Routers from "./router.js"
import { emailsValidationController, loginController } from "../controllers/sessions.controller.js"
import { postUsersController } from "../controllers/users.controller.js"
import { emailsValidation, sessionsValidation } from "../validations/joiSessions.validation.js"

class SessionsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/current', ['USER', 'ADMIN'], async (req, res) => res.jsonSuccess(req.user))
        
        this.post('/login', ['PUBLIC'], sessionsValidation, loginController)
        this.post('/register', ['PUBLIC'], postUsersController)
        this.post('/register/verification', ['PUBLIC'], emailsValidation, emailsValidationController)
        this.post('/logout', ['USER', 'ADMIN'], async(req, res) => res.clearCookie('cookieToken').redirectPage('/login'))
    }
}

export const sessionsRoute = new SessionsRouter()
