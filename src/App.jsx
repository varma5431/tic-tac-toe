// src/App.jsx
import React, { useState, useRef } from 'react'
import BackgroundPatterns from './components/BackgroundPatterns'
import Board from './components/Board'
import ResultModal from './components/ResultModal'
import './index.css'

export default function App() {
  const [history, setHistory]     = useState([Array(9).fill(null)])
  const [step, setStep]           = useState(0)
  const [xIsNext, setXIsNext]     = useState(true)
  const [score, setScore]         = useState({ X: 0, O: 0 })
  const [modalResult, setModalResult] = useState(null)

  // preload sounds
  const soundX    = useRef(new Audio('/sounds/place-x.mp3'))
  const soundO    = useRef(new Audio('/sounds/place-o.mp3'))
  const soundWin  = useRef(new Audio('/sounds/win.mp3'))
  const soundDraw = useRef(new Audio('/sounds/draw.mp3'))

  const current = history[step]

  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return [a,b,c]
      }
    }
    return null
  }

  const winningLine = calculateWinner(current)
  const isDraw = !winningLine && current.every(cell => cell !== null)

  function handleClick(i) {
    if (current[i] || winningLine) return

    // play placement sound
    if (xIsNext) soundX.current.play()
    else         soundO.current.play()

    const next = current.slice()
    next[i] = xIsNext ? 'X' : 'O'
    const newHist = history.slice(0, step + 1).concat([next])

    setHistory(newHist)
    setStep(newHist.length - 1)

    // check for win/draw
    const winnerLine = calculateWinner(next)
    if (winnerLine) {
      const winner = xIsNext ? 'X' : 'O'
      setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }))
      setTimeout(function() {
        soundWin.current.play()
        setModalResult({ message: winner + ' Wins!' })
      }, 300)
    } else if (next.every(cell => cell !== null)) {
      setTimeout(function() {
        soundDraw.current.play()
        setModalResult({ message: 'It\'s a Draw!' })
      }, 300)
    }

    setXIsNext(!xIsNext)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setStep(0)
    setXIsNext(true)
    setModalResult(null)
  }

  return (
    <>
      {/* 100 random X/O’s floating in the back */}
      <BackgroundPatterns />

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '2rem'
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>
          Tic-Tac-Toe
        </h1>

        <div style={{ margin: '1rem 0', fontSize: '1.2rem' }}>
          Next: <strong>{xIsNext ? 'X' : 'O'}</strong> &nbsp;&nbsp;|&nbsp;&nbsp;
          X: <strong>{score.X}</strong> — O: <strong>{score.O}</strong>
        </div>

        <Board
          squares={current}
          onClick={handleClick}
          winningLine={winningLine}
        />

        {(winningLine || isDraw) && !modalResult && (
          <button
            onClick={restart}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Restart
          </button>
        )}
      </div>

      {modalResult && (
        <ResultModal message={modalResult.message} onClose={restart} />
      )}
    </>
  )
}