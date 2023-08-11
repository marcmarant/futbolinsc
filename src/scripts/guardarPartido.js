import { algoritmoElo } from './algoritmoElo';
import { getPlayer } from '../config/firebase';
import { getDoc, updateDoc } from 'firebase/firestore';

export function guardarPartido(partido) {

    /* Estructura de partido:

        partido = { 
            defensaVic, 
            delanteroVic, 
            defensaDerr, 
            delanteroDerr
        } 
    */

    const promises = []; // Array de promesas de obtencion de los documentos mediante getDoc 

    for (const player in partido) {    
        const playerRef = getPlayer(partido[player]);
        const promise = getDoc(playerRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                partido[player] = {playerRef, data};
            } else {
            console.log(`El jugador con ID ${partido[player]} no existe`);
            }
        })
        .catch((error) => {
            console.error(error);
        });
        promises.push(promise);
    }

    /* Estructura de partido tras recuperar las promesas:

        partido = { 
            defensaVic = {
                defensaVicRef,
                data = {
                    ataque,
                    defensa,
                    mote
                }
        ...
    */

    return Promise.all(promises)
    .then(() => {
        partido = algoritmoElo(partido); // Se modifican los datos 
        const updatePromises = [];
        for (const player in partido) {
            updatePromises.push(updateDoc(partido[player].playerRef, partido[player].data));
        }
        return Promise.all(updatePromises);
    })
    .catch((error) => {
        console.error(error);
        return null;
    });

}