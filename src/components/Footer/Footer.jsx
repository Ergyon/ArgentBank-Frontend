import React from 'react'
import './Footer.css'

const Footer = () => {
  const today = new Date()
  const thisYear = today.getFullYear()

  return (
    <footer>
      <span>Copyright {thisYear} Argent Bank</span>
    </footer>
  )
}

export default Footer
