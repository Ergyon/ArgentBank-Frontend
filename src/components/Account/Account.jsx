import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Account = ({ account }) => {
  // format devise en $
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <section className="account">
      <div className="account-content">
        <h3 className="account-title">{account.displayName}</h3>
        <p className="account-amount">{formatCurrency(account.balance)}</p>
        <p className="account-infotext">Available balance</p>
      </div>
      <div className="account-cta">
        <Link to="/transactions/:accountID" aria-label="View details">
          <ArrowRight size={35} />
        </Link>
      </div>
    </section>
  )
}

export default Account
