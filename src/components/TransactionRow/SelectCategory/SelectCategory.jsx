import React from 'react'
import './SelectCategory.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCategories } from '../../../services/api'

const SelectCategory = ({ currentCategory, onChange }) => {
  const [categories, setCategories] = useState([])

  // recuperer categories au chargement
  useEffect(() => {
    const response = getCategories()
    if (response.status === 200) {
      setCategories(response.body)
    }
  }, [])

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <select
      className="category-select"
      value={currentCategory}
      onChange={handleChange}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  )
}

export default SelectCategory
