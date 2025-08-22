import { useState } from "react"
import { sendChatMessage } from "../lib/game"
import type { ChatMessage } from "../types"
import { auth } from "../firebase"

interface ChatBoxProps {
  gameId: string
  chat: ChatMessage[]
}

export default function ChatBox({ gameId, chat }: ChatBoxProps) {
  const [input, setInput] = useState("")
  const me = auth.currentUser

  const handleSend = () => {
    if (!input.trim()) return
    sendChatMessage(gameId, me?.displayName || "Guest", input.trim())
    setInput("")
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Chat</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          height: "200px",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {chat && chat.length > 0 ? (
          chat.map((msg, i) => {
            const isAI = msg.sender === "AI"
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: isAI ? "flex-start" : "flex-end",
                  marginBottom: "6px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: isAI ? "#e0f0ff" : "#d4f8d4", // AI blue, User green
                    fontStyle: isAI ? "italic" : "normal",
                    color: "#000",
                  }}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              </div>
            )
          })
        ) : (
          <div className="small">No messages yet</div>
        )}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: "6px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "6px" }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
