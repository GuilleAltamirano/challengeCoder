import { Router } from "express"
import passport from "passport"
import cors from 'cors'
import { ApiError } from "../errors/Api.error.js"
import { WHITE_LIST } from "../env/vars.env.js"

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
        this.router.use(await this.corsOptions())
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
            passport.authenticate('jwt', function (err, user, info) {
            if (err) return next(err)

            if (!user && (req.path !== '/login' && req.path !== '/register' && req.path !== '/register/verification')) return res.redirect('/login')
            if (user && (req.path === '/login' || req.path === '/register')) return res.redirect('/')
            req.user = user

            if (policies[0] === 'PUBLIC') return next()
            if (!policies.includes(user.user.role)) throw new ApiError('No permission', 401)
            
            next()
            })(req, res, next)
        }catch (err) {next(err)}
    }

    customRes (req, res, next) {
        try {
            res.jsonSuccess = payload => res.status(200).json({status: 'success', payload})
            res.jsonMessage = message => res.status(200).json({status: true, message})
            res.renderPage = (hbs, payload) => res.status(200).render(hbs, payload)
            res.redirectPage = url => res.redirect(304, url)
            res.cookieSession = token => res.cookie('cookieToken', token, {
                signed: true,
                maxAge: 3600000,
                httpOnly: true
            }).redirect(304, '/')
            res.cookieAuthEmail = (date) => res.cookie('cookieAuthEmail', date, {
                signed: true,
                maxAge: 600000,
                httpOnly: true
            }).redirect(304, '/register/validation')
            next()
        } catch (err) {next(err)}
    }

    async corsOptions() {
        return cors({
            origin: WHITE_LIST,
            allowedHeaders: ['Content-Type', 'Authorization']
        });
    }
}