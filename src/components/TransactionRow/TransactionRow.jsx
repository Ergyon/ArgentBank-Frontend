import React from 'react'
import './TransactionRow.css'

const TransactionRow = ({ transaction }) => {
  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toFixed(2)
    return amount < 0 ? `-$${formatted}` : `$${formatted}`
  }

  return (
    <div className="transaction-row">
      <div className="transaction-info">{transaction.date}</div>
      <div className="transaction-info">{transaction.description}</div>
      <div className="transaction-info">{formatAmount(transaction.amount)}</div>
      <div className="transaction-info">${transaction.balance.toFixed(2)}</div>
    </div>
  )
}

export default TransactionRow
