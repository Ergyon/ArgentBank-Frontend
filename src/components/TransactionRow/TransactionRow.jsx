import React, { useState } from 'react'
import './TransactionRow.css'
import { X, ChevronDown, Pencil, Check } from 'lucide-react'
import SelectCategory from './SelectCategory/SelectCategory'
import { updateCategory, updateNote } from '../../services/api'

const TransactionRow = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(transaction.category)
  const [currentNote, setCurrentNote] = useState(transaction.notes || '')

  // etats pour edition
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [tempNote, setTempNote] = useState(currentNote)
  const [isEditingNote, setIsEditingNote] = useState(false)

  // gestion toggle
  const handleToggle = () => {
    setIsOpen(!isOpen)
    setIsEditingCategory(false)
    setIsEditingNote(false)
  }

  // gerer changement de category
  const handleCategoryChange = (newCategory) => {
    const response = updateCategory(transaction.id, newCategory)

    if (response.status === 200) {
      setCurrentCategory(newCategory)
      setIsEditingCategory(false)
    }
  }

  // ajouter une note
  const handleSaveNotes = () => {
    const response = updateNote(transaction.id, tempNote)

    if (response.status === 200) {
      setCurrentNote(tempNote)
      setIsEditingNote(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveNotes()
    } else if (e.key === 'Escape') {
      setTempNote(currentNote)
      setIsEditingNote(false)
    }
  }

  // formatter date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth()).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${day}/${month}/${year}`
  }

  // formatter montant
  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toFixed(2)
    return amount < 0 ? `-$${formatted}` : `$${formatted}`
  }

  return (
    <div className="transaction-row">
      <div className="transaction-info">{formatDate(transaction.date)}</div>
      <div className="transaction-info">{transaction.description}</div>
      <div className="transaction-info">{formatAmount(transaction.amount)}</div>
      <div className="transaction-info">${transaction.balance.toFixed(2)}</div>
      <button className="transaction-cta" onClick={handleToggle}>
        {isOpen ? (
          <X size={25} color="white" />
        ) : (
          <ChevronDown size={25} color="white" />
        )}
      </button>
      {isOpen && (
        <div className="transaction-details">
          <div className="detail-row">
            <div className="detail-label">Transaction type</div>
            <div className="detail-value">{transaction.type}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">Category</div>
            {isEditingCategory ? (
              <SelectCategory
                currentCategory={currentCategory}
                onChange={handleCategoryChange}
              />
            ) : (
              <>
                <div className="detail-value">
                  {currentCategory}
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditingCategory(true)}
                    aria-label="Edit category"
                  >
                    <Pencil size={16} color="white" />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="detail-row">
            <div className="detail-label">Note</div>
            {isEditingNote ? (
              <input
                type="text"
                className="note-input"
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a note"
              ></input>
            ) : (
              <>
                <div className="detail-value">
                  {transaction.notes || currentNote || 'No note.'}
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditingNote(true)}
                    aria-label="Edit note"
                  >
                    <Pencil size={16} color="white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionRow
