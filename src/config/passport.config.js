import passport from "passport"
import jwt from "jsonwebtoken"
import { Strategy, ExtractJwt } from "passport-jwt"
import { cookieExtractor } from "../controllers/sessions.controller.js"
import { JWT_SECRET_KEY } from "../env/vars.env.js"

export const generateToken = async (user) => {return jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: "1h"})}

export const passportConfig = () => {
    passport.use('jwt', new Strategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET_KEY
    }, async (jwt_payload, done) => {try {return done(null, jwt_payload)} 
        catch (error) {done(error)}
    }))
}