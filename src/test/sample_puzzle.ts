// puzzle.ts
// Multiple 5×5 word-square puzzles (each row and each column is a real English word)

export const PUZZLE_ROWS = 5
export const PUZZLE_COLS = 5

export interface Clue {
  number: number
  text: string
  answer: string
}

export interface Puzzle {
  SOLUTION: string[][]
  ACROSS_CLUES: Clue[]
  DOWN_CLUES: Clue[]
}

// ---------------- PUZZLES ----------------
export const PUZZLES: Puzzle[] = [
  {
    SOLUTION: [
      ['H','E','A','R','T'], // HEART
      ['E','M','B','E','R'], // EMBER
      ['A','B','U','S','E'], // ABUSE
      ['R','E','S','I','N'], // RESIN
      ['T','R','E','N','D'], // TREND
    ],
    ACROSS_CLUES: [
      { number: 1, text: 'Body part; center', answer: 'HEART' },
      { number: 2, text: 'A glowing coal', answer: 'EMBER' },
      { number: 3, text: 'Mistreat', answer: 'ABUSE' },
      { number: 4, text: 'Plant secretion', answer: 'RESIN' },
      { number: 5, text: 'General direction', answer: 'TREND' },
    ],
    DOWN_CLUES: [
      { number: 1, text: 'Body part; center', answer: 'HEART' },
      { number: 2, text: 'A glowing coal', answer: 'EMBER' },
      { number: 3, text: 'Mistreat', answer: 'ABUSE' },
      { number: 4, text: 'Plant secretion', answer: 'RESIN' },
      { number: 5, text: 'General direction', answer: 'TREND' },
    ],
  },
  {
    SOLUTION: [
      ['W','A','T','E','R'], // WATER
      ['A','W','A','R','E'], // AWARE
      ['T','A','L','O','N'], // TALON
      ['E','R','O','D','E'], // ERODE
      ['R','E','N','E','W'], // RENEW
    ],
    ACROSS_CLUES: [
      { number: 1, text: 'Liquid, essential for life', answer: 'WATER' },
      { number: 2, text: 'Conscious of', answer: 'AWARE' },
      { number: 3, text: 'Bird of prey’s claw', answer: 'TALON' },
      { number: 4, text: 'Wear away slowly', answer: 'ERODE' },
      { number: 5, text: 'To make new again', answer: 'RENEW' },
    ],
    DOWN_CLUES: [
      { number: 1, text: 'Liquid, essential for life', answer: 'WATER' },
      { number: 2, text: 'Conscious of', answer: 'AWARE' },
      { number: 3, text: 'Bird of prey’s claw', answer: 'TALON' },
      { number: 4, text: 'Wear away slowly', answer: 'ERODE' },
      { number: 5, text: 'To make new again', answer: 'RENEW' },
    ],
  },
  {
    SOLUTION: [
      ['C','L','U','M','P'], // CLUMP
      ['L','U','N','A','R'], // LUNAR
      ['U','N','T','I','E'], // UNTIE
      ['M','A','I','Z','E'], // MAIZE
      ['P','R','E','E','N'], // PREEN
    ],
    ACROSS_CLUES: [
      { number: 1, text: 'A compact mass', answer: 'CLUMP' },
      { number: 2, text: 'Relating to the moon', answer: 'LUNAR' },
      { number: 3, text: 'To unfasten', answer: 'UNTIE' },
      { number: 4, text: 'A cereal grain (corn)', answer: 'MAIZE' },
      { number: 5, text: 'To groom feathers (or primp)', answer: 'PREEN' },
    ],
    DOWN_CLUES: [
      { number: 1, text: 'A compact mass', answer: 'CLUMP' },
      { number: 2, text: 'Relating to the moon', answer: 'LUNAR' },
      { number: 3, text: 'To unfasten', answer: 'UNTIE' },
      { number: 4, text: 'A cereal grain (corn)', answer: 'MAIZE' },
      { number: 5, text: 'To groom feathers (or primp)', answer: 'PREEN' },
    ],
  },
]

// ---- Backward-compatible exports (first puzzle as default) ----
export const SOLUTION = PUZZLES[0].SOLUTION
export const ACROSS_CLUES = PUZZLES[0].ACROSS_CLUES
export const DOWN_CLUES = PUZZLES[0].DOWN_CLUES

// ---- Helpers ----
export function emptyBoard(): (string | null)[][] {
  return Array.from({ length: PUZZLE_ROWS }, () =>
    Array<string | null>(PUZZLE_COLS).fill(null)
  )
}

// Optionally fill board with some letters already placed
export function startingBoard(puzzleIndex = 0, missingRate = 0.5): (string | null)[][] {
  return PUZZLES[puzzleIndex].SOLUTION.map(row =>
    row.map(ch => (Math.random() < missingRate ? null : ch))
  )
}

export function isCorrectLetter(r: number, c: number, ch: string, puzzleIndex = 0) {
  return PUZZLES[puzzleIndex].SOLUTION[r][c] === ch.toUpperCase()
}

export function isComplete(board: (string | null)[][], puzzleIndex = 0) {
  const sol = PUZZLES[puzzleIndex].SOLUTION
  for (let r = 0; r < PUZZLE_ROWS; r++) {
    for (let c = 0; c < PUZZLE_COLS; c++) {
      if ((board[r][c] || '').toUpperCase() !== sol[r][c]) return false
    }
  }
  return true
}
