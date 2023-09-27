import React, { useState, useEffect,createContext } from "react";

import { createSession } from "../services/api";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const Navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user = localStorage.getItem('user')

        if (user){
            setUser(JSON.parse(user))
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const response = await createSession(email, password)

        localStorage.setItem('user', JSON.stringify(response.data.user))

        setUser(response.data.user)

        Navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)

        Navigate('/login')
    }

    return(
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            loading,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}