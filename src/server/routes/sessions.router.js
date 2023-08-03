import Routers from "./router.js"
import { emailsValidationController, loginController, forgotPasswordController, newPasswordController, logoutController } from "../controllers/sessions.controller.js"
import { emailsValidation, sessionsValidation } from "../middlewares/sessionsValidations.middleware.js"
import passport from "passport"
import varsEnv from "../env/vars.env.js"

const {SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED, ROLE_USER_BASIC, ROLE_PUBLIC} = varsEnv

class SessionsRouter extends Routers {
    constructor () {
        super()
    }

    async init(){
        this.get('/current', [ROLE_USER_BASIC, SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], async (req, res) => res.jsonSuccess(req.user))
        this.get('/verification', [ROLE_PUBLIC], emailsValidation, emailsValidationController)
        
        this.post('/login', [ROLE_PUBLIC], await sessionsValidation('login'), loginController)
        this.post('/forgotpassword', [ROLE_PUBLIC], await sessionsValidation('forgot'), forgotPasswordController)
        this.get('/newpassword', [ROLE_PUBLIC], newPasswordController)
        this.delete('/logout', [ROLE_USER_BASIC, SUPERIOR_PRIVILEGES, ROLE_USER_ADVANCED], logoutController)
        
        //google
        this.get('/auth/google', [ROLE_PUBLIC],passport.authenticate('google', { session: false }))
        this.get('/auth/google/callback', [ROLE_PUBLIC],passport.authenticate('google', 
        {session: false,failureRedirect: '/auth/google/failure',successRedirect: '/'}))
        this.get('/auth/google/failure', [ROLE_PUBLIC], async (req, res) => res.json({status: false, error: 'Error in google'}))
    }
}

export const sessionsRoute = new SessionsRouter()
