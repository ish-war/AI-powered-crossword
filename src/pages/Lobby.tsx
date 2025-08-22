import { useState } from 'react'
import { auth } from '../firebase'
import { createGame } from '../lib/game'
import { useNavigate } from 'react-router-dom'

export default function Lobby() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onCreate() {
    try {
      setLoading(true)
      console.log("currentUser", auth.currentUser)
      const u = auth.currentUser
      if (!u) {
        console.error("No user signed in yet")
        return
      }
      const id = await createGame(u.uid, u.displayName || 'Guest')
      console.log("Game created with id", id)
      navigate(`/game/${id}`)   // ✅ redirect to the Game page
    } catch (err) {
      console.error("Create game failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Lobby</h2>
      <p className="small">
        Click to spin up a game vs the AI. Open two browser tabs to see real-time sync.
      </p>
      <div className="flex" style={{ marginTop: 12 }}>
        <button onClick={onCreate} disabled={loading}>
          {loading ? 'Creating game…' : 'Create Game vs AI'}
        </button>
      </div>
    </div>
  )
}
