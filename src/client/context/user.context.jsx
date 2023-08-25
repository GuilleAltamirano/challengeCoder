import { createContext, useState, useEffect } from 'react'
import { fetchUser } from '../helper/user.helper'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const fetchUserData = async () => {
        const data = await fetchUser()
        setUser(data)
    }

    useEffect(() => {
        if (!user) fetchUserData()
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
