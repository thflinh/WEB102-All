import React from 'react'

export default function SearchBar({ value, onChange, onSubmit }) {
  const handleKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <input
      type="text"
      placeholder="Search item by name…"
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={handleKey}
      className="search-input"
    />
  )
}
