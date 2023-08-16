import { playersCollection } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import './Scoreboard.css';

// Colores de los botones de ordenamiento
const pressColor = '#3c3c3c'
const unpressColor = '#1a1a1a'

// Implementacion de quicksort para ordenar los jugadores:
const quicksort = (arr, property) => {// property podra ser ataque o defensa
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][property] > pivot[property]) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return [...quicksort(leftArr), pivot, ...quicksort(rightArr)];
}

export const Scoreboard = () => {

  const [players, setPlayers] = useState([])
  const [sortBy, setSortBy] = useState('ataque')// Por defecto se ordena por ataque
  const [buttonColors, setButtonColors] = useState({
    ataque: pressColor,
    defensa: unpressColor
  })

  useEffect(() => { 
    const getPlayers = async () => {
      try {
        const snapshot = await getDocs(playersCollection)
        const playersArray = snapshot.docs.map((doc) => doc.data())
        setPlayers(quicksort(playersArray, sortBy))
      }
      catch(error) {
        console.error('Error al obtener los jugadores', error)
      }
    }
    getPlayers()
  }, [sortBy])

  const handleButtonClick = (property) => {
    setSortBy(property);
    setButtonColors({
      ataque: property === 'ataque' ? pressColor :unpressColor,
      defensa: property === 'defensa' ? pressColor : unpressColor
    })
  }

  return (
    <div>
      <div className='head_div'>
        <h3>Clasificación ELO</h3>
        <div>
          <button 
            className='ataque_bt' 
            style={{ backgroundColor: buttonColors.ataque }} 
            onClick={() => handleButtonClick('ataque')}
          >Ataque</button>
          <button
            className='defensa_bt'
            style={{ backgroundColor: buttonColors.defensa }}
            onClick={() => handleButtonClick('defensa')}
          >Defensa</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Mote</th>
            <th>Ataque</th>
            <th>Defensa</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.mote}>
              <td>{index+1}º</td>
              <td><b>{player.mote}</b></td>
              <td>{player.ataque}</td>
              <td>{player.defensa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
