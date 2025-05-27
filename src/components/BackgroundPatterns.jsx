import React, { useMemo } from 'react'

// Paths to your X/O tile images in public/images/
const X_IMG = '/images/x-pattern.png'
const O_IMG = '/images/o-pattern.png'

// How many total symbols to scatter
const NUM_PATTERNS = 100

export default function BackgroundPatterns() {
  // Generate and memoize random placements once
  const patterns = useMemo(() => {
    const arr = []
    for (let i = 0; i < NUM_PATTERNS; i++) {
      arr.push({
        type: Math.random() < 0.5 ? 'X' : 'O',
        left:  Math.random() * 100 + 'vw',
        top:   Math.random() * 100 + 'vh',
        rot:   Math.random() * 360 + 'deg',
        scale: 0.5 + Math.random() // 0.5 → 1.5
      })
    }
    return arr
  }, [])

  return (
    <div className="pattern-container">
      {patterns.map((p, index) => (
        <img
          key={index}
          src={p.type === 'X' ? X_IMG : O_IMG}
          alt={p.type}
          className="pattern-item"
          style={{
            left: p.left,
            top: p.top,
            transform: 'rotate(' + p.rot + ') scale(' + p.scale + ')'
          }}
        />
      ))}
    </div>
  )
}