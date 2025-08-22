import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { auth } from '../firebase'
import type { GameDoc } from '../types'
import { subscribeGame, placeLetter, nextEmptyCell, sendChatMessage } from '../lib/game'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import ClueList from '../components/ClueList'
import { PUZZLES, PUZZLE_COLS, PUZZLE_ROWS } from '../puzzle'
import ChatBox from '../components/ChatBox'

export default function Game() {
  const { id } = useParams<{ id: string }>()
  const gameId = id!

  const [game, setGame] = useState<(GameDoc & { puzzleIndex: number }) | null>(null)
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const me = auth.currentUser!

  useEffect(() => {
    if (!gameId) return
    const unsub = subscribeGame(gameId, setGame)
    return () => unsub()
  }, [gameId])

  // --- AI agent (runs on client just for demo) ---
  useEffect(() => {
    if (!game || !game.ai.active || game.status !== 'playing') return
    const { puzzleIndex } = game
    const solution = PUZZLES[puzzleIndex].SOLUTION

    const t = setInterval(() => {
      const board = game.board
      const at = nextEmptyCell(board)
      if (!at) return
      const [r, c] = at
      const correct = solution[r][c]
      // 20% chance AI "thinks" wrong on purpose
      const rand = Math.random()
      const choice =
        rand < 0.2
          ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
          : correct
      placeLetter(gameId, 'ai', r, c, choice)

      // --- AI also sends a chat message ---
      const aiMessages = [
        "Got one!",
        "I think this is right...",
        "Hmm, tricky spot!",
        "Easy letter 😎",
      ]
      const msg = aiMessages[Math.floor(Math.random() * aiMessages.length)]
      sendChatMessage(gameId, "AI", msg)
    }, game.ai.speedMs)
    return () => clearInterval(t)
  }, [game, gameId])

  const handlePlace = (r: number, c: number, ch: string) => {
    if (!game || game.status !== 'playing') return
    placeLetter(gameId, me.uid, r, c, ch)
  }

  if (!game) return <div className="card">Loading game…</div>

  const done = game.status === "finished"
  if (done) {
    return <Navigate to={`/game/${gameId}/over`} />
  }

  // Get the correct puzzle based on puzzleIndex
  const { puzzleIndex } = game
  const puzzle = PUZZLES[puzzleIndex]

  return (
    <div className="panel">
      <div>
        <div className="card">
          <h3>
            Grid {PUZZLE_ROWS}×{PUZZLE_COLS} {done ? '— Finished!' : ''}
          </h3>
          <p className="small">
            Click a cell, then type letters. Backspace clears.
          </p>
          <GameBoard
            board={game.board}
            selected={selected}
            setSelected={setSelected}
            onPlace={handlePlace}
          />
        </div>
        <div style={{ height: 12 }} />
        <Scoreboard players={game.players} />
      </div>
      <div>
        <ClueList title="Across" clues={puzzle.ACROSS_CLUES} />
        <div style={{ height: 12 }} />
        <ClueList title="Down" clues={puzzle.DOWN_CLUES} />
        {/* Chat */}
        <ChatBox gameId={gameId} chat={game.chat || []} />
      </div>
    </div>
  )
}
