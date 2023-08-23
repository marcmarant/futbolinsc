import { playersCollection } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';

export const PlayerPick = ( {onSelect} ) => { // onSelect es llamado cuando <select> cambia de valor

    const [players, setPlayers] = useState([]);

    useEffect(() => { 
        const getPlayers = async () => {
            try {
                const snapshot = await getDocs(playersCollection)
                const playersArray = snapshot.docs.map((doc) => {
                    return {
                        'id': doc.id,
                        'mote': doc.data().mote
                    }
                })
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
            <select onChange={(e) => onSelect(e.target.options[e.target.selectedIndex].getAttribute('data-key'))}>
                <option disabled selected value="">Seleccione un jugador</option>
                {players.map((player) => (
                    <option key={player.mote} data-key={player.id}>
                        {player.mote}
                    </option>
                ))}
            </select>
        </div>
  );
};