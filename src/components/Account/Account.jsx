import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Account.css'
import { useState } from 'react'

const Account = ({ account }) => {
  // const [collapse, isCollapse] useState(false)
  // todo changer icone selon la page (profile, transactions)

  // format devise en $
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="account">
      <div className="account-content">
        <h3 className="account-title">{account.displayName}</h3>
        <p className="account-amount">{formatCurrency(account.balance)}</p>
        <p className="account-infotext">Available balance</p>
      </div>
      <div className="account-cta">
        <Link to={`/transactions/${account.id}`} aria-label="View details">
          <ArrowRight size={35} color="white" />
        </Link>
      </div>
    </div>
  )
}

export default Account
