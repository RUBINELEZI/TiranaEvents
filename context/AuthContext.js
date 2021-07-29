import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null)
    const router = useRouter();

    //register
    const register = async (user) => {
        console.log(user)
    }

    //login
    const login = async ({email:identifier, password}) => {
        console.log({identifier, password})
    }

    //logout
    const logout = async () => {
        console.log('Logout')
    }

    //checkLogin
    const checkLogin = async (user) => {
        console.log(user)
    }


    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext
