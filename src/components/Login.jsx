import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import santacruzlogo  from "../assets/santacruz.png"
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      alert('El email o contraseña proporcionados no son correctos')
      console.error(err)
    }
  }

  return (
    <div className='Login'>
      <img src={santacruzlogo} className='logo' alt='Santa Cruz logo'></img>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  )
}
