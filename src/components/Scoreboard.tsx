import React from 'react'
import type { Players } from '../types'


const Scoreboard: React.FC<{ players: Players }> = ({ players }) => {
const entries = Object.entries(players)
.map(([id, p]) => ({ id, ...p }))
.sort((a, b) => b.score - a.score)
return (
<div className="card">
<h3>Scoreboard</h3>
<div className="score">
{entries.map((p) => (
<div key={p.id} className="pill">{p.displayName}: {p.score}</div>
))}
</div>
</div>
)
}


export default Scoreboard
