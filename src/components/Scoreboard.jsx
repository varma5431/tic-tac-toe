import React from 'react'

export default function Scoreboard({ currentPlayer, score }) {
  return (
    <div className="flex justify-between items-center mb-2 px-2">
      <div>
        Next: <span className="font-bold">{currentPlayer}</span>
      </div>
      <div>
        X: <span className="font-bold">{score.X}</span> — O: <span className="font-bold">{score.O}</span>
      </div>
    </div>
  )
}