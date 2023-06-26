import Routers from "./router.js"
import { emailsValidationController, loginController, forgotPasswordController } from "../controllers/sessions.controller.js"
import { postUsersController } from "../controllers/users.controller.js"
import { emailsValidation, sessionsValidation } from "../validations/joiSessions.validation.js"
import passport from "passport"

class SessionsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/current', ['USER', 'ADMIN'], async (req, res) => res.jsonSuccess(req.user))
        
        this.post('/login', ['PUBLIC'], await sessionsValidation('login'), loginController)
        this.post('/forgot-password', ['PUBLIC'], await sessionsValidation('forgot'), forgotPasswordController)
        this.post('/register', ['PUBLIC'], postUsersController)
        this.post('/verification', ['PUBLIC'], emailsValidation, emailsValidationController)
        this.post('/logout', ['USER', 'ADMIN'], async(req, res) => res.clearCookie('cookieToken').redirectPage('/login'))
        
        this.get('/auth/google', ['PUBLIC'],passport.authenticate('google', { session: false }))
        this.get('/auth/google/callback', ['PUBLIC'],passport.authenticate('google', 
        {session: false,failureRedirect: '/auth/google/failure',successRedirect: '/'}))
        
        this.get('/auth/google/failure', ['PUBLIC'], async (req, res) => res.jsonSuccess('Error en google'))
    }
}

export const sessionsRoute = new SessionsRouter()
