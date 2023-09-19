import { PlayerPick } from './PlayerPick'
import { useState, useEffect } from "react"
import { guardarPartido } from "../scripts/guardarPartido.js"
import { getData } from "../scripts/previewPartido.js"

export const NewMatch = ({ authorUid }) => {

  const [defensaVic, setDefensaVic] = useState('')
  const [delanteroVic, setDelanteroVic] = useState('')
  const [defensaDerr, setDefensaDerr] = useState('')
  const [delanteroDerr, setDelanteroDerr] = useState('')

  const [eloMedioVic, setEloMedioVic] = useState(null)
  const [eloMedioDerr, setEloMedioDerr] = useState(null)
  const [probVic, setProbVic] = useState(null)
  const [probDerr, setProbDerr] = useState(null)
  const [eloWon, setEloWon] = useState(null)

  const crearPartido = () => {
    if (defensaVic == '' || delanteroVic == '' || defensaDerr == '' || delanteroDerr == '')
      alert('Debes seleccionar los 4 jugadores necesarios para poder conformar una partida.')
    else {
      const partido = {defensaVic, delanteroVic, defensaDerr, delanteroDerr}
      try {
        guardarPartido(partido, authorUid)
        alert('Partido guardado correctamente')
      }catch(e) {
        alert('Error al guardar el partido: '+e)
      }
    }
  }

  useEffect(() => {
    const previewPartido = async () => {
      if ((defensaVic != '' && delanteroVic != '') || (defensaDerr != '' && delanteroDerr != '')) {
        const prePartido = {defensaVic, delanteroVic, defensaDerr, delanteroDerr}
        const preData = await getData(prePartido)
        setEloMedioVic(preData.eloVic)
        setEloMedioDerr(preData.eloDerr)
        setProbVic(preData.probVic)
        setProbDerr(preData.probDerr)
        setEloWon(preData.eloWon)
      }
    }
    previewPartido()
  }, [defensaVic, delanteroVic, defensaDerr, delanteroDerr]);

  return (
    <div>
      <h2>Nuevo Partido</h2>
      <div>
        <h3>Ganadores:</h3>
        <label>Defensa</label>
          <PlayerPick placeholder='Seleccione un jugador' onSelect={(nombre) => setDefensaVic(nombre)} />
        <label>Delantero</label>
          <PlayerPick placeholder='Seleccione un jugador' onSelect={(nombre) => setDelanteroVic(nombre)} />
        {eloMedioVic != null ?
          <div>
            <label>ELO Medio:</label>
            <h4>{eloMedioVic}</h4>
          </div> 
          : null
        }
        {probVic != null ?
          <div>
            <label>Probabilidades de Victoria:</label>
            <h4>{probVic}</h4>
          </div> 
          : null
        }
      </div>
      <div>
        <h3>Perdedores:</h3>
        <label>Defensa</label>
          <PlayerPick placeholder='Seleccione un jugador' onSelect={(nombre) => setDefensaDerr(nombre)} />
        <label>Delantero</label>
          <PlayerPick placeholder='Seleccione un jugador' onSelect={(nombre) => setDelanteroDerr(nombre)} />
        {eloMedioDerr != null ?
          <div>
            <label>ELO Medio:</label>
            <h4>{eloMedioDerr}</h4>
          </div> 
          : null
        }
        {probDerr != null ?
          <div>
            <label>Probabilidades de Victoria:</label>
            <h4>{probDerr}</h4>
          </div> 
          : null
        }
      </div>
      {eloWon != null ?
        <div>
          <label>Elo a ganar/perder:</label>
          <h4>{eloWon}</h4>
        </div> 
        : null
      }
      <button onClick={crearPartido} >Confirmar</button>
    </div>
  )
}