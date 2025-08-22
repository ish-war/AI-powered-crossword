import { addDoc, collection, doc, onSnapshot, runTransaction, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import type { Board, GameDoc, Players, ChatMessage } from '../types'
import { PUZZLES, startingBoard, isComplete, isCorrectLetter } from '../puzzle'
import { PUZZLE_ROWS, PUZZLE_COLS } from '../puzzle'

const GAMES = 'games'

// Firestore-safe version of GameDoc (board is string[] instead of 2D array)
interface FirestoreGameDoc extends Omit<GameDoc, "board"> {
  board: string[]
  puzzleIndex: number
}

// --- Helpers to convert board <-> Firestore safe format ---
function boardToFirestore(board: Board): string[] {
  return board.map(row =>
    row.map(ch => ch ?? "").join("") // null -> "", row becomes string
  )
}

function boardFromFirestore(rows: string[]): Board {
  return rows.map(row =>
    row.split("").map(ch => (ch === "" ? null : ch))
  )
}

// Create a new game with partially hidden board + human + AI players
export async function createGame(uid: string, displayName: string) {
  const puzzleIndex = Math.floor(Math.random() * PUZZLES.length) // pick random puzzle
  const board = startingBoard(puzzleIndex, 0.5)  // 50% hidden
  const players: Players = {
    [uid]: { displayName, score: 0 },
    ai: { displayName: 'AI', score: 0 },
  }

  const docRef = await addDoc(collection(db, GAMES), {
    createdAt: Date.now(),
    status: 'playing',
    board: boardToFirestore(board),
    players,
    ai: { active: true, speedMs: 2000 + Math.floor(Math.random() * 2000) }, // random 2–4 sec delay
    puzzleIndex,
    chat: [], // ✅ initialize empty chat
  } as FirestoreGameDoc & { chat: ChatMessage[] })

  return docRef.id
}

// Join an existing game (adds user to players map)
export async function joinGame(gameId: string, uid: string, displayName: string) {
  const ref = doc(db, GAMES, gameId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Game not found')
    const data = snap.data() as FirestoreGameDoc
    const players = { ...data.players }
    if (!players[uid]) players[uid] = { displayName, score: 0 }
    tx.set(ref, { ...data, players }, { merge: true })
  })
}

// Subscribe to game state changes in Firestore
export function subscribeGame(gameId: string, cb: (g: GameDoc & { puzzleIndex: number }) => void) {
  const ref = doc(db, GAMES, gameId)
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) return
    const data = snap.data() as FirestoreGameDoc & { chat: ChatMessage[] }
    // Convert board back to 2D array
    const game: GameDoc & { puzzleIndex: number } = {
      ...data,
      board: boardFromFirestore(data.board),
      puzzleIndex: data.puzzleIndex,
      chat: data.chat || [], // ✅ include chat
    }
    cb(game)
  })
}

// Place a letter at (r, c). Updates score + game state atomically.
export async function placeLetter(gameId: string, uid: string, r: number, c: number, ch: string) {
  if (!ch) return
  const letter = ch.toUpperCase().slice(0, 1)
  if (letter < 'A' || letter > 'Z') return

  const ref = doc(db, GAMES, gameId)
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Game not found')
    const data = snap.data() as FirestoreGameDoc
    const board: Board = boardFromFirestore(data.board)

    const puzzleIndex = data.puzzleIndex ?? 0

    // Ignore if already correct
    const prev = board[r][c]
    if (prev && prev.toUpperCase() === PUZZLES[puzzleIndex].SOLUTION[r][c]) {
      return
    }

    board[r][c] = letter

    // Update scores
    const players: Players = { ...data.players }
    let delta = 0
    if (isCorrectLetter(r, c, letter, puzzleIndex)) delta = 10
    else delta = -5
    if (!players[uid]) players[uid] = { displayName: 'Guest', score: 0 }
    players[uid].score += delta

    let status: GameDoc['status'] = data.status
    if (isComplete(board, puzzleIndex)) status = 'finished'

    // Commit the updated game state
    const updated: FirestoreGameDoc = {
      ...data,
      board: boardToFirestore(board),
      players,
      status,
      puzzleIndex,
    }
    tx.set(ref, updated, { merge: true })
  })
}

// Find the next empty cell (used by AI)
export function nextEmptyCell(board: Board): [number, number] | null {
  for (let r = 0; r < PUZZLE_ROWS; r++) {
    for (let c = 0; c < PUZZLE_COLS; c++) {
      if (!board[r][c]) return [r, c]
    }
  }
  return null
}

// --- NEW: Chat helper ---
export async function sendChatMessage(gameId: string, sender: string, text: string) {
  const ref = doc(db, GAMES, gameId)
  const message: ChatMessage = {
    sender,
    text,
    timestamp: Date.now(),
  }
  await updateDoc(ref, {
    chat: arrayUnion(message),
  })
}
