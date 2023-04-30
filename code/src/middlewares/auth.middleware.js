export const authMiddleware = (req, res, next) => {
    const isLoggedIn = req.session.email !== undefined
    const isLoggingIn = req.path === '/login' || req.path === '/api/sessions/login'
    const isRegistering = req.path === '/register' || req.path === '/api/sessions/register'

    if ((isLoggingIn || isRegistering) && isLoggedIn) return res.redirect('/') 
    
    if (!isLoggedIn && !(isLoggingIn || isRegistering)) return res.redirect('/login')

    next()
}
