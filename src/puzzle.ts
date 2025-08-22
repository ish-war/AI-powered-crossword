// puzzle.ts - 10x10 crossword puzzles

export const PUZZLE_ROWS = 10
export const PUZZLE_COLS = 10

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
      ['C','O','M','P','U','T','E','R','S','S'],
      ['O','B','J','E','C','T','I','V','E','R'],
      ['M','A','G','N','E','T','I','C','S','A'],
      ['P','U','Z','Z','L','E','G','A','M','E'],
      ['U','N','I','V','E','R','S','A','L','S'],
      ['T','E','C','H','N','O','L','O','G','Y'],
      ['E','X','P','E','R','I','M','E','N','T'],
      ['R','E','S','O','U','R','C','E','F','U'],
      ['S','Y','S','T','E','M','A','T','I','C'],
      ['S','O','L','U','T','I','O','N','S','S'],
    ],
    ACROSS_CLUES: [
      { number: 1, text: 'Electronic device', answer: 'COMPUTERS' },
      { number: 2, text: 'Adjective meaning goal-oriented', answer: 'OBJECTIVER' },
      { number: 3, text: 'Related to magnets', answer: 'MAGNETICSA' },
      { number: 4, text: 'Brain teaser or game', answer: 'PUZZLEGAME' },
      { number: 5, text: 'Universal, worldwide', answer: 'UNIVERSALS' },
      { number: 6, text: 'Applied science & innovation', answer: 'TECHNOLOGY' },
      { number: 7, text: 'Scientific trial', answer: 'EXPERIMENT' },
      { number: 8, text: 'Available supply', answer: 'RESOURCEFU' },
      { number: 9, text: 'Methodical and organized', answer: 'SYSTEMATIC' },
      { number: 10, text: 'Answers to problems', answer: 'SOLUTIONS' },
    ],
    DOWN_CLUES: [
      { number: 1, text: 'Electronic device', answer: 'COMPUTERS' },
      { number: 2, text: 'Adjective meaning goal-oriented', answer: 'OBJECTIVER' },
      { number: 3, text: 'Related to magnets', answer: 'MAGNETICSA' },
      { number: 4, text: 'Brain teaser or game', answer: 'PUZZLEGAME' },
      { number: 5, text: 'Universal, worldwide', answer: 'UNIVERSALS' },
      { number: 6, text: 'Applied science & innovation', answer: 'TECHNOLOGY' },
      { number: 7, text: 'Scientific trial', answer: 'EXPERIMENT' },
      { number: 8, text: 'Available supply', answer: 'RESOURCEFU' },
      { number: 9, text: 'Methodical and organized', answer: 'SYSTEMATIC' },
      { number: 10, text: 'Answers to problems', answer: 'SOLUTIONS' },
    ],
  },
  {
    SOLUTION: [
      ['I','N','T','E','L','L','I','G','E','N'],
      ['N','A','T','U','R','A','L','L','Y','S'],
      ['T','E','C','H','N','I','C','A','L','I'],
      ['E','X','P','L','O','R','A','T','I','O'],
      ['L','A','B','O','R','A','T','O','R','Y'],
      ['L','O','G','I','C','A','L','L','Y','S'],
      ['I','N','F','O','R','M','A','T','I','C'],
      ['G','E','N','E','R','A','T','O','R','S'],
      ['E','N','G','I','N','E','E','R','I','N'],
      ['N','A','V','I','G','A','T','O','R','S'],
    ],
    ACROSS_CLUES: [
      { number: 1, text: 'Smart or clever', answer: 'INTELLIGEN' },
      { number: 2, text: 'By nature', answer: 'NATURALLYS' },
      { number: 3, text: 'Related to technology', answer: 'TECHNICALI' },
      { number: 4, text: 'Investigate or discover', answer: 'EXPLORATIO' },
      { number: 5, text: 'Scientific workplace', answer: 'LABORATORY' },
      { number: 6, text: 'Reasoning step', answer: 'LOGICALLYS' },
      { number: 7, text: 'Related to information', answer: 'INFORMATIC' },
      { number: 8, text: 'Machine that generates', answer: 'GENERATORS' },
      { number: 9, text: 'Designs engines', answer: 'ENGINEERIN' },
      { number: 10, text: 'One who navigates', answer: 'NAVIGATORS' },
    ],
    DOWN_CLUES: [
      { number: 1, text: 'Smart or clever', answer: 'INTELLIGEN' },
      { number: 2, text: 'By nature', answer: 'NATURALLYS' },
      { number: 3, text: 'Related to technology', answer: 'TECHNICALI' },
      { number: 4, text: 'Investigate or discover', answer: 'EXPLORATIO' },
      { number: 5, text: 'Scientific workplace', answer: 'LABORATORY' },
      { number: 6, text: 'Reasoning step', answer: 'LOGICALLYS' },
      { number: 7, text: 'Related to information', answer: 'INFORMATIC' },
      { number: 8, text: 'Machine that generates', answer: 'GENERATORS' },
      { number: 9, text: 'Designs engines', answer: 'ENGINEERIN' },
      { number: 10, text: 'One who navigates', answer: 'NAVIGATORS' },
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
