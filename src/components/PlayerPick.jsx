import { playersCollection } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';

export const PlayerPick = ( {onSelect} ) => { // onSelect es llamado cuando <select> cambia de valor

    const [players, setPlayers] = useState([]);

    useEffect(() => { 
        const getPlayers = async () => {
            try {
                const snapshot = await getDocs(playersCollection)
                const playersArray = snapshot.docs.map((doc) => doc.id) // doc.data().mote para motes
                setPlayers(playersArray)
            }
            catch(error) {
                console.error('Error al obtener los jugadores', error)
            }
        }
        getPlayers()
    }, []);

    return (
        <div>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option disabled selected value="">Seleccione un jugador</option> // selected no es optimo
                {players.map((player) => (
                    <option key={player}>
                        {player}
                    </option>
                ))}
            </select>
        </div>
  );
};