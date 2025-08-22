import { Routes, Route } from 'react-router-dom'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import GameOver from './pages/GameOver'
import { AuthGate } from './components/AuthGate'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Crossword vs AI</h1>
      </header>
      <AuthGate>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/game/:id/over" element={<GameOver />} />
        </Routes>
      </AuthGate>
    </div>
  )
}
