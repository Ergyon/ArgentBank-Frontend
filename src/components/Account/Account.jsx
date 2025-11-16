import React from 'react'
import { ArrowRight, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import './Account.css'

const Account = ({ account }) => {
  const location = useLocation()
  const isTransactionPage = location.pathname.includes('/transactions')

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
        {isTransactionPage ? (
          <Link to="/profile" aria-label="close">
            <X size={35} color="white" />
          </Link>
        ) : (
          <Link to={`/transactions/${account.id}`} aria-label="View details">
            <ArrowRight size={35} color="white" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Account
