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
  const [isAuthentified, setIsAuthentified] = useState(false)
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)

  // verifier au chargement si un token existe
  useEffect(() => {
    const storedToken =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthentified(true)
    }
  }, [])

  // connexion
  const login = (token, rememberMe, user = null) => {
    setToken(token)
    setIsAuthentified(true)
    setUserData(user)

    if (rememberMe) {
      localStorage.setItem('token', token)
    } else {
      sessionStorage.setItem('token', token)
    }
  }

  // deconnexion
  const logout = () => {
    setToken(null)
    setIsAuthentified(false)
    setUserData(null)
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
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
