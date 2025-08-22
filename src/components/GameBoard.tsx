import React from 'react'
import type { Board } from '../types'


interface Props {
board: Board
selected: { r: number; c: number } | null
setSelected: (pos: { r: number; c: number } | null) => void
onPlace: (r: number, c: number, ch: string) => void
}


const GameBoard: React.FC<Props> = ({ board, selected, setSelected, onPlace }) => {
return (
<div className="grid" role="grid" aria-label="Crossword grid">
{board.map((row, r) =>
row.map((cell, c) => {
const isSel = selected && selected.r === r && selected.c === c
const classes = ['cell']
if (cell === '#') classes.push('block')
if (isSel) classes.push('selected')
return (
<div
key={`${r}-${c}`}
className={classes.join(' ')}
onClick={() => setSelected({ r, c })}
onKeyDown={(e) => {
if (!isSel) return
const ch = e.key.toUpperCase()
if (ch.length === 1 && ch >= 'A' && ch <= 'Z') onPlace(r, c, ch)
if (e.key === 'Backspace') onPlace(r, c, '')
}}
tabIndex={0}
>
{board[r][c]}
</div>
)
})
)}
</div>
)
}


export default GameBoard
