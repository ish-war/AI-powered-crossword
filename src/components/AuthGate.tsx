import React, { useEffect, useState } from 'react'
import { auth, signInAnon, signInWithGoogle, signOutUser } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'


export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [ready, setReady] = useState(false)
const [user, setUser] = useState(() => auth.currentUser)


useEffect(() => {
return onAuthStateChanged(auth, (u) => {
setUser(u || null)
setReady(true)
})
}, [])


if (!ready) return <div className="card">Loading…</div>


if (!user) {
return (
<div className="card">
<h2>Sign in</h2>
<p className="small">Use Google or play as Guest (anonymous)</p>
<div className="flex" style={{ marginTop: 12 }}>
<button onClick={signInWithGoogle}>Sign in with Google</button>
<button className="secondary" onClick={signInAnon}>Play as Guest</button>
</div>
</div>
)
}


return (
<div>
<div className="flex" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
<div>
<div className="small">Signed in as</div>
<div>{user.displayName || 'Guest'} {user.isAnonymous ? '(Guest)' : ''}</div>
</div>
<button className="ghost" onClick={signOutUser}>Sign out</button>
</div>
{children}
</div>
)
}
