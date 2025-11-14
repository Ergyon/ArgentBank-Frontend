import React from 'react'
import { useState, useEffect, useContext, createContext } from 'react'

const AuthContext = createContext()

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// provider
export const AuthProvider = ({ children }) => {
  // recuperer token et userData si deja existants
  const storedToken =
    localStorage.getItem('token') || sessionStorage.getItem('token')

  const storedUserData = () => {
    const stored =
      localStorage.getItem('userData') || sessionStorage.getItem('userData')
    return stored ? JSON.parse(stored) : null
  }

  const [token, setToken] = useState(storedToken)
  const [userData, setUserData] = useState(storedUserData)
  const [isAuthentified, setIsAuthentified] = useState(false)

  // connexion
  const login = (token, rememberMe, user = null) => {
    setToken(token)
    setIsAuthentified(true)
    setUserData(user)

    if (rememberMe) {
      localStorage.setItem('token', token)
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user))
      }
    } else {
      sessionStorage.setItem('token', token)
      if (user) {
        sessionStorage.setItem('userData', JSON.stringify(user))
      }
    }
  }

  // deconnexion
  const logout = () => {
    setToken(null)
    setIsAuthentified(false)
    setUserData(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userData')
  }

  const value = {
    isAuthentified,
    token,
    userData,
    setUserData,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
