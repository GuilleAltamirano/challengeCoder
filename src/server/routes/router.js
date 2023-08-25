import { Router } from "express"
import passport from "passport"
import { ApiError } from "../errors/Api.error.js"
import varsEnv from "../env/vars.env.js"

const {ROLE_PUBLIC, NAME_COOKIE_SESSION, NAME_COOKIE_VALIDATION, COOKIE_AUTH_DURATION} = varsEnv

export default class Routers {
    constructor () {
        this.router = Router(),
        this.init()
    }
    //-----------------------------------------------------------------------------------------------------------------
    async getRouter () {
        return this.router
    }
    //-----------------------------------------------------------------------------------------------------------------
    async init (){
    }
    //-----------------------------------------------------------------------------------------------------------------
    get(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.customRes, this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks){
        this.router.post(path, this.handlePolicies(policies), this.customRes, this.applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks){
        this.router.put(path, this.handlePolicies(policies), this.customRes, this.applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks){
        this.router.delete(path, this.handlePolicies(policies), this.customRes, this.applyCallbacks(callbacks))
    }

    applyCallbacks (callbacks) {
        return callbacks.map((cb) => async (...params) => {
            await cb.apply(this, params)
        })
    }

    handlePolicies = policies => async (req, res, next) => {
        try {
            passport.authenticate('login', function (err, user, info) {
                if (err) return next(err)
                if (policies[0] === ROLE_PUBLIC) return next()
                if (!user && (req.path !== '/login' && req.path !== '/register' && req.path !== '/register/verification' && req.path !== '/auth/google' && req.path !== '/auth/google/callback')) return res.status(401).json({status: false, message: 'redirect to login'})
                if (user && (req.path === '/login' || req.path === '/register')) return res.status(401).json({status: false, message: 'Logged in, redirect to home'})
                req.user = user
                if (!policies.includes(user.user.role)) throw new ApiError('No permission', 401)
                
                next()
            })(req, res, next)
        }catch (err) {next(err)}
    }

    customRes (req, res, next) {
        try {
            res.jsonSuccess = payload => res.status(200).json({status: 'success', payload})
            res.jsonMessage = message => res.status(200).json({status: 'success', message})
            res.redirectPage = url => res.status(302).redirect(url)
            res.cookieSession = token => res.cookie(NAME_COOKIE_SESSION, token, {
                signed: true,
                maxAge: COOKIE_AUTH_DURATION,
                httpOnly: true
            }).redirect(302, '/home')
            res.cookieAuthEmail = (date) => res.cookie(NAME_COOKIE_VALIDATION, date, {
                signed: true,
                maxAge: 600000,
                httpOnly: true
            }).redirect(304, '/validation')
            res.cookieNewPassword = ({token, id}) => res.cookie(NAME_COOKIE_SESSION, token, {
                signed: true,
                maxAge: COOKIE_AUTH_DURATION,
                httpOnly: true
            }).status(302).redirect(`/newpassword/?user=${id}`)
            next()
        } catch (err) {next(err)}
    }
}