import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"

export const Logout = () => {

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }

  return (<button style={{background: '#444'}} onClick={logout}> Logout </button>)
}