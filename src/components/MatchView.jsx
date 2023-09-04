import React, { useEffect, useState } from 'react'
import { matchesCollection } from '../config/firebase'
import { query, limit, getDocs } from 'firebase/firestore'
import { PlayerPick } from './PlayerPick'
import './MatchView.css'

export const MatchView = () => {

  const maxMatches = 10 // Number of matches to show
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getMatches = async () => {
      try {
        const q = query(matchesCollection, limit(maxMatches))
        const snapshot = await getDocs(q)
        const matchesArray = snapshot.docs.map((doc) => doc.data())
        setMatches(matchesArray)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    getMatches()
  }, [])

  const transformToMote = (id) => {
    const words = id.split('_')[0].split('_')
    const mote = words.map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    return mote.join(' ')
  }

  return (
    <div>
      <div className='head_div'>
        <h3>Ultimos partidos</h3>
        <div>
          {/* TODO: <option> for sorting */}
          <PlayerPick placeholder='Filtrar' />
        </div>
      </div>
      <div className='match_container'>
        {loading ?
          <p>Cargando...</p>
        : error ?
          <p>Error al cargar los partidos</p>
        : (
          matches.map((match, index) => (
            <div className='match' key={index}>
              {/* Transform and display match attributes */}
              <div className='match_date'>
                {/* Render date here */}
              </div>
              <div className='match_players'>
                <h4>DEF {transformToMote(match.defensaVic)}</h4>
                <h4>DEF {transformToMote(match.defensaDerr)}</h4>
                <h4>DEL {transformToMote(match.delanteroVic)}</h4>
                <h4>DEL {transformToMote(match.delanteroDerr)}</h4>
                <h2 className='elo_vic'>+{match.eloObtenido}</h2>
                <h2 className='elo_derr'>-{match.eloObtenido}</h2>
              </div>
            </div>
          ))
        )}
      </div>
      {/* TODO: Render Match components */}
    </div>
  )
}