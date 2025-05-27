import React from 'react'
import Cell from './Cell'

export default function Board({ squares, onClick, winningLine }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 100px)',
      gap: 10,
      marginTop: 20
    }}>
      {squares.map((v,i) => (
        <Cell
          key={i}
          value={v}
          onClick={() => onClick(i)}
          highlight={winningLine?.includes(i)}
        />
      ))}
    </div>
  )
}