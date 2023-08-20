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
        <div className='title_div'>
          <h2 className='title'>Futbolin SC by SAF</h2>
          {user ?
            <h1>;)</h1> :
            <Link to='/'><button className='login_bt'>Inicia Sesion</button></Link>
          }
        </div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/scoreboard'>Scoreboard</Link></li>
          </ul>
        </nav>
      </header>
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
