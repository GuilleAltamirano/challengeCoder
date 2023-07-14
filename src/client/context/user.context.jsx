import { createContext, useState, useEffect, useContext } from 'react'
import { fetchUser } from '../helper/user.helper'
import { AuthContext } from './auth.context'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const {isAuth, setIsAuth} = useContext(AuthContext)

    useEffect(() => {
        const petition = async () => {
            const data = await fetchUser(setIsAuth)
            setUser(data)
        }
        if (isAuth !== 'false') petition()
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}