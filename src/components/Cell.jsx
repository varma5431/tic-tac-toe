// src/components/Cell.jsx
import React from 'react'

export default function Cell({ value, onClick, highlight }) {
  // 5. Black‐coloured board
  const base = {
    width: 100, height: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: highlight ? '#222' : '#000',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }
  // Thin light border so grid lines show on dark bg
  const border = {
    border: highlight ? '4px solid gold' : '2px solid #555'
  }
  // Colored, animated X/O
  const symbolStyle = {
    fontSize: 48, fontWeight: 'bold',
    color: value === 'X' ? '#e53e3e' : '#3182ce',
    transform: value ? 'scale(1)' : 'scale(0)',
    opacity: value ? 1 : 0,
    transition: 'transform 0.3s, opacity 0.3s'
  }

  return (
    <div
      onClick={onClick}
      style={{ ...base, ...border }}
      onMouseEnter={e => e.currentTarget.style.background = '#111'}
      onMouseLeave={e => e.currentTarget.style.background = highlight ? '#222' : '#000'}
    >
      <div style={symbolStyle}>{value}</div>
    </div>
  )
}