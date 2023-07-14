import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem('isAuth')
    )

    useEffect(() => {
        localStorage.setItem('isAuth', isAuth);
    }, [isAuth])

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
