import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"

export const Logout = () => {

  const logout = async () => {
    try {
      await signOut(auth)
      console.log('se salio correctamente');
    } catch (err) {
      console.error(err)
    }
  }

  return (<button onClick={logout}> Logout </button>)
}