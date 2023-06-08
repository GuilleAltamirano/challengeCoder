import Routers from "./router.js"
import { loginController } from "../controllers/sessions.controller.js"
import { postUsersController } from "../controllers/users.controller.js"
import { sessionsValidation } from "../validations/joiSessions.validation.js"

class SessionsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.post('/login', ['PUBLIC'], sessionsValidation,loginController)
        this.post('/register', ['PUBLIC'], postUsersController)
        this.post('/logout', ['USER', 'ADMIN'], async(req, res) => res.clearCookie('cookieToken').redirectPage('/login'))
        
        this.get('/current', ['PUBLIC', 'ADMIN'], async (req, res) => res.jsonSuccess(req.user))
    }
}

export const sessionsRoute = new SessionsRouter()
