import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscribeGame } from "../lib/game";
import type { GameDoc } from "../types";

export default function GameOver() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDoc | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const unsub = subscribeGame(id, setGame);
    return () => unsub();
  }, [id]);

  if (!game) return <div className="card">Loading results…</div>;

  // Convert players object to array and sort by score descending
  const leaderboard = Object.entries(game.players)
    .map(([uid, player]) => ({ uid, ...player }))
    .sort((a, b) => b.score - a.score);

  const winner = leaderboard[0];

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2>🏆 Game Over</h2>
      <p>
        Winner: <strong>{winner.displayName}</strong> with {winner.score} points
      </p>

      <h3>Leaderboard</h3>
      <ul className="list" style={{ marginTop: 8, textAlign: "left" }}>
        {leaderboard.map((player, index) => (
          <li key={player.uid}>
            {index + 1}. {player.displayName} — {player.score} pts
          </li>
        ))}
      </ul>

      <button style={{ marginTop: 16 }} onClick={() => navigate("/")}>
        New Game
      </button>
    </div>
  );
}
