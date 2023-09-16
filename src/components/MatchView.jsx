import React, { useEffect, useState } from 'react'
import { matchesCollection } from '../config/firebase'
import { query, limit, where, getDocs } from 'firebase/firestore'
import { PlayerPick } from './PlayerPick'
import './MatchView.css'

export const MatchView = () => {

  const maxMatches = 20 // Number of matches to show
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filtro, setFiltro] = useState(null)

  useEffect(() => {
    const getMatches = async () => {
      try {
        setLoading(true)
        let matchesArray = []
        if (filtro) {
          const campos = ["defensaDerr", "defensaVic", "delanteroDerr", "delanteroVic"];
          for (const campo of campos) {
            const q = query(matchesCollection, where(campo, "==", filtro), limit(maxMatches - matchesArray.length))
            const snapshot = await getDocs(q)
            const filteredDocs = snapshot.docs.map((doc) => doc.data())
            matchesArray = [...matchesArray, ...filteredDocs];
          }
        } else {
          const q = query(matchesCollection, limit(maxMatches))
          const snapshot = await getDocs(q)
          matchesArray = snapshot.docs.map((doc) => doc.data())
        }
        setMatches(matchesArray)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log(error)
      }
    }
    getMatches()
  }, [filtro])

  const getDate = (match) => {
    const date = new Date(match.fecha)
    return [date.toLocaleDateString('es-ES'), date.toLocaleTimeString('es-ES')]// formato: es, zona horaria: ES
  }

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
          <PlayerPick placeholder='Filtrar' onSelect={(nombre) => setFiltro(nombre)} />
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
              <div className='match_date'>
                {getDate(match).map((dateElem) => (
                  <h5>{dateElem}</h5>
                ))}
              </div>
              <h5 className='match_author'>Subido por {transformToMote(match.autor)}</h5>
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
    </div>
  )
}