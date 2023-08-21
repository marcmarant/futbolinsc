import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { NewMatch } from './NewMatch.jsx'
import { Scoreboard } from './Scoreboard'
import { Login } from './Login'
import { Route, Routes, Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import './App.css'

function App () {

  const [user, setUser] = useState(null);
  const [onMenu, setOnMenu] = useState(false);

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

  const toggleMenu = () => {
    setOnMenu(!onMenu)
  }

  return (
    <div className='App'>
      <header>
        <i className={onMenu ? 'fas fa-times' : 'fas fa-bars'} onClick={toggleMenu}></i>
        <h2 className='title'>Futbolin SC</h2>
        {user ?
          <h1>🔜</h1> :
          <Link to='/'><button className='login_bt'>Inicia Sesion</button></Link>
        }
      </header>
      {onMenu ?
        <ul className='menu'>
            <li><Link to='/' onClick={toggleMenu}>Home</Link></li>
            <li><Link to='/scoreboard' onClick={toggleMenu}>Scoreboard</Link></li>
        </ul>
        : null
      }
      <section>
        <Routes>
          <Route path='/' element={user ? <NewMatch user={user} /> : <Login />} />
          <Route path='/scoreboard' element={<Scoreboard />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
