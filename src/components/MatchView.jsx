import { matchesCollection } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { PlayerPick } from './PlayerPick'
import { useState } from 'react';

export const MatchView = () => {

  const [matches, setMatches] = useState([])

  const getMatches = async () => {
    try {
      const snapshot = await getDocs(matchesCollection)
      const matchesArray = snapshot.docs.map((doc) => doc.data())
      setMatches(matchesArray)
    }
    catch(error) {
        console.error('Error al obtener los partidos', error)
    }
  }
  getMatches()

  const getDate = (match) => {
    const date = new Date(match.fecha)
    return [date.toLocaleDateString('es-ES'), date.toLocaleTimeString('es-ES')]// formato: es, zona horaria: ES
  }

  return (
    <div className='MatchView'>
      <div className='head_div'>
        <h3>Ultimos partidos</h3>
        <div>
          {/* TODO: <option> para ordenamiento */}
          <PlayerPick placeholder='Filtrar'/>
        </div>
      </div>
      {matches.map((match) => (
        <div>
          <div>
          {getDate(match).map((dateElem) => (
            <h6>{dateElem}</h6>
          ))}
          </div>
          <div>
            <h5>Defensa Vic: {match.defensaVic}</h5>
            <h5>Delantero Vic: {match.delanteroVic}</h5>
            <h5>Defensa Derr: {match.defensaDerr}</h5>
            <h5>Delantero Derr: {match.delanteroDerr}</h5>
          </div>
          <h4>{match.eloObtenido}</h4>
        </div>
      ))}
      {/* TODO: Desplegar componentes <Match /> */}
    </div>
  )
}
