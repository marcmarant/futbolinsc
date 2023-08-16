import './App.css'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { NewMatch } from './NewMatch.jsx'
import { Login } from './Login'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react"

function App () {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) { // El usuario ha iniciado sesión
        setUser(user);
      } else { // El usuario no ha iniciado sesión
        setUser(null);
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={user ? <NewMatch user={user} /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
