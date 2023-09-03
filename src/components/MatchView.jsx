import { matchesCollection, getPlayerRef } from '../config/firebase'
import { query, limit, getDocs } from 'firebase/firestore'
import { PlayerPick } from './PlayerPick'
import { useState } from 'react';
import './MatchView.css'


export const MatchView = () => {

  const maxMatches = 10 // Número de partidos mostrados
  const [matches, setMatches] = useState([])

  const getMatches = async () => {
    try {
      const q = query(matchesCollection, limit(maxMatches));
      const snapshot = await getDocs(q)
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
    return [date.toLocaleDateString('es-ES'), date.toLocaleTimeString('es-ES')] // formato: es, zona horaria: ES
  }

  return (
    <div>
      <div className='head_div'>
        <h3>Ultimos partidos</h3>
        <div>
          {/* TODO: <option> para ordenamiento */}
          <PlayerPick placeholder='Filtrar'/>
        </div>
      </div>
      <div className='match_container'>
        {matches.map((match) => (
          <div className='match'>
            <div className='match_date'>
            {getDate(match).map((dateElem) => (
              <h5>{dateElem}</h5>
            ))}
            </div>
            <div className='match_players'>
              <h4>DF: {match.defensaVic}</h4>
              <h4>DF: {match.defensaDerr}</h4>
              <h4>DL: {match.delanteroVic}</h4>
              <h4>DL: {match.delanteroDerr}</h4>
              <h2 className='elo_vic'>+{match.eloObtenido}</h2>
              <h2 className='elo_derr'>-{match.eloObtenido}</h2>
            </div>
          </div>
        ))}
      </div>
      {/* TODO: Desplegar componentes <Match /> */}
    </div>
  )
}
