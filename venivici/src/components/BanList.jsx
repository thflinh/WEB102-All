import React from 'react'

export default function BanList({ list, onRemove }) {
  if (!list.length) return <p className="empty">Nothing banned yet.</p>
  return (
    <div className="ban-list">
      {list.map(val => (
        <button key={val} onClick={() => onRemove(val)}>
          {val} ❌
        </button>
      ))}
    </div>
  )
}
