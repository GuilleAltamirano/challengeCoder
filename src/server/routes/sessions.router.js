import Routers from "./router.js"
import { emailsValidationController, loginController, forgotPasswordController, newPasswordController, logoutController } from "../controllers/sessions.controller.js"
import { emailsValidation, sessionsValidation } from "../validations/joiSessions.validation.js"
import passport from "passport"

class SessionsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/current', ['USER', 'ADMIN', 'PREMIUM'], async (req, res) => res.jsonSuccess(req.user))
        this.get('/verification', ['PUBLIC'], emailsValidation, emailsValidationController)
        
        this.post('/login', ['PUBLIC'], await sessionsValidation('login'), loginController)
        this.post('/forgotpassword', ['PUBLIC'], await sessionsValidation('forgot'), forgotPasswordController)
        this.get('/newpassword', ['PUBLIC'], newPasswordController)
        this.delete('/logout', ['USER', 'ADMIN', 'PREMIUM'], logoutController)
        
        this.get('/auth/google', ['PUBLIC'],passport.authenticate('google', { session: false }))
        this.get('/auth/google/callback', ['PUBLIC'],passport.authenticate('google', 
        {session: false,failureRedirect: '/auth/google/failure',successRedirect: '/'}))
        
        this.get('/auth/google/failure', ['PUBLIC'], async (req, res) => res.json({status: false, error: 'Error in google'}))
    }
}

export const sessionsRoute = new SessionsRouter()
