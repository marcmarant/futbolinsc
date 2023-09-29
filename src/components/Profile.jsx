import { Logout } from './Logout'
import { getCuentaRef, getPlayerRef } from '../config/firebase'
import { getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import './Scoreboard.css';

export const Profile = ({ userUid }) => {

    const [data, setData] = useState(null)

    useEffect(() => { 
        const getData = async () => {
            const cuentaRef = getCuentaRef(userUid)
            try {
                const cuentaSnapShot = await getDoc(cuentaRef)
                const cuentaData = cuentaSnapShot.data()
                const userId = cuentaData.elo_id
                const playerRef = getPlayerRef(userId)
                const playerSnapShot = await getDoc(playerRef)
                setData(playerSnapShot.data());
            }
            catch(error) {
                console.error('Error al obtener los datos de su cuenta', error)
            }
        }
        getData()
    }, [])

    return (
        <div className='Profile'>
            <h4>Ataque: {data.ataque}</h4>
            <h4>Defensa: {data.defensa}</h4>
            <h4>Record de Ataque: {data.ataque_record}</h4>
            <h4>Record de Defensa: {data.defensa_record}</h4>
            <h4>Partidos Jugados: {data.partidos_ganados + data.partidos_perdidos}</h4>
            <h4>Partidos Ganados: {data.partidos_ganados}</h4>
            <h4>Partidos Perdidos: {data.partidos_perdidos}</h4>
            <Logout />
        </div>
    )
}
