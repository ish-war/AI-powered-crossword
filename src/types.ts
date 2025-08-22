export type Board = (string | null)[][] // null = empty, '#' = block, 'A'..'Z' = filled

export type Players = Record<string, { displayName: string; score: number }>

// New: Chat message type
export interface ChatMessage {
  sender: string   // uid or "ai"
  text: string
  timestamp: number
}

export interface GameDoc {
  createdAt: number
  status: 'waiting' | 'playing' | 'finished'
  board: Board
  players: Players
  ai: { active: boolean; speedMs: number }

  // New: Chat messages for this game
  chat: ChatMessage[]
}
