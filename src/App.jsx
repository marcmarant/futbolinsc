import './App.css'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { NewMatch } from './components/NewMatch.jsx'
import { Login } from './components/Login'
import { Nav } from './components/Nav'
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
    // Estoy pensando en poner ifs para auth leaderboar partido... en vez de un solo ?
    // No haria falta mainapp seria otro componente
    // Me da que voy a tener que usar el react route ese
    <>
      <div className="App">
        {user ? <NewMatch user={user} /> : <Login />}
      </div>
    </>
  )
}

export default App
