import React from 'react'

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
