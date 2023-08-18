import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { NewMatch } from './NewMatch.jsx'
import { Scoreboard } from './Scoreboard'
import { Login } from './Login'
import { Route, Routes, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import santacruzlogo  from "../assets/santacruz.png"
import './App.css'

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
    <div className='App'>
      <header>
        <img src={santacruzlogo} alt='Santa Cruz logo'></img>
        <h2>Futbolin SC by SAF</h2>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/scoreboard'>Scoreboard</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={user ? <NewMatch user={user} /> : <Login />} />
        <Route path='/scoreboard' element={<Scoreboard />} />
      </Routes>
    </div>
  )
}

export default App
