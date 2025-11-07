import React from 'react'
import { CircleUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../../img/argentBankLogo.png'
import './Header.css'

const Header = () => {
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
      <Link to="/signin" className="header-signin" aria-label="Se connecter">
        <CircleUserRound size={22} />
        <span className="header-signin-text">Sign in</span>
      </Link>
    </header>
  )
}

export default Header
