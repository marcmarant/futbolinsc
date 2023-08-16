import { playersCollection } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import './Scoreboard.css';

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

  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('ataque');// Por defecto se ordena por ataque

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
  }, [sortBy]);

  return (
    <div>
      <h3>Clasificación</h3>
      <button className='ataque_bt' onClick={() => setSortBy('ataque')}>Ataque</button>
      <button className='defensa_bt' onClick={() => setSortBy('defensa')}>Defensa</button>
      <table>
        <thead>
          <tr>
            <th>Mote</th>
            <th>Ataque</th>
            <th>Defensa</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.mote}>
              <td>{player.mote}</td>
              <td>{player.ataque}</td>
              <td>{player.defensa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
