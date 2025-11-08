import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Error = () => {
  return (
    <>
      <Header />

      <div className="error-wrapper">
        <h2 className="error-title">404</h2>
        <h3 className="error-subtitle">Not found</h3>
        <p className="error-text">This page does not exist.</p>
        <Link
          to="/"
          className="error-backhome"
          aria-label="Back to the home page"
        >
          Home page
        </Link>
      </div>

      <Footer />
    </>
  )
}

export default Error
