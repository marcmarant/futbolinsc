import { Logout } from './Logout'
import { PlayerPick } from './PlayerPick'
import { useState } from "react"
import { guardarPartido } from "../scripts/guardarPartido.js"

export const NewMatch = ({ user }) => {

  const [defensaVic, setDefensaVic] = useState("")
  const [delanteroVic, setDelanteroVic] = useState("")
  const [defensaDerr, setDefensaDerr] = useState("")
  const [delanteroDerr, setDelanteroDerr] = useState("")

  const crearPartido = () => {
    if (defensaVic == "" || delanteroVic == "" || defensaDerr == "" || delanteroDerr == "")
      alert("Debes seleccionar los 4 jugadores necesarios para poder conformar una partida.")
    else {
      const partido = {
        defensaVic,
        delanteroVic,
        defensaDerr,
        delanteroDerr
      }
      guardarPartido(partido)
    }
  }

  return (
    <div>
      <h2>Bienvenido, {user.uid}</h2>
      <Logout/>
      <h3>Ganadores:</h3>
        <label>Defensa</label>
          <PlayerPick onSelect={(nombre) => setDefensaVic(nombre)} />
        <label>Delantero</label>
          <PlayerPick onSelect={(nombre) => setDelanteroVic(nombre)} />
      <h3>Perdedores:</h3>
        <label>Defensa</label>
          <PlayerPick onSelect={(nombre) => setDefensaDerr(nombre)} />
        <label>Delantero</label>
          <PlayerPick onSelect={(nombre) => setDelanteroDerr(nombre)} />
      <button onClick={crearPartido} >Confirmar</button>
    </div>
  )
}