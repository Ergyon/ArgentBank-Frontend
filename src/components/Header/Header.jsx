import React from 'react'
import { CircleUserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../img/argentBankLogo.png'
import './Header.css'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
  const { isAuthentified, logout, userData } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const displayName = () => {
    if (!userData) return ''

    if (userData.username) {
      return userData.username
    }

    return `${userData.firstName} ${userData.lastName}`.trim()
  }

  return (
    <header>
      <Link to="/">
        <img
          alt="Argent Bank Logo"
          src={logo}
          className="logo"
          aria-label="Accueil"
        ></img>
      </Link>

      {isAuthentified ? (
        <>
          <div className="header-user-log">
            <Link to="/profile" className="header-signin">
              <span className="header-username">{displayName()}</span>
              <CircleUserRound size={22} />
              <button
                className="header-signin-btn"
                aria-label="Se déconnecter"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Link to="/signin" className="header-signin" aria-label="Se connecter">
          <CircleUserRound size={22} />
          <button className="header-signin-btn">Sign in</button>
        </Link>
      )}
    </header>
  )
}

export default Header
