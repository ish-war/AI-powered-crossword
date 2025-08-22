import React from 'react'


interface Clue { number: number; text: string; answer: string }


const ClueList: React.FC<{ title: string; clues: Clue[] }> = ({ title, clues }) => {
return (
<div className="card">
<h3>{title}</h3>
<ul className="list">
{clues.map((c) => (
<li key={c.number}><strong>{c.number}.</strong> {c.text}</li>
))}
</ul>
</div>
)
}


export default ClueList
