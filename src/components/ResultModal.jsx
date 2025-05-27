// src/components/ResultModal.jsx
import React from 'react'

export default function ResultModal({ message, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 style={{ margin: 0 }}>{message}</h2>
        <button
          onClick={onClose}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}