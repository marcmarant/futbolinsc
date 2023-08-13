import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

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
    <div>
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}> Login </button>
    </div>
  )
}
