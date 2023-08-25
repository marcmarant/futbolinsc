import { algoritmoElo } from './algoritmoElo';
import { getPlayerRef, newMatchRef } from '../config/firebase';
import { getDoc, updateDoc, setDoc } from 'firebase/firestore';

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
        const playerRef = getPlayerRef(partido[player]);
        const promise = getDoc(playerRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                const id = docSnapshot.id;
                const data = docSnapshot.data();
                partido[player] = {playerRef, id, data};
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
                playerRef,
                id,
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
            if (player != 'eloObtenido') {
                updatePromises.push(updateDoc(partido[player].playerRef, partido[player].data));
            }
        }
        const saveMatch = async () => {
            await setDoc(newMatchRef(), {
                defensaVic: partido.defensaVic.id,
                delanteroVic: partido.delanteroVic.id,
                defensaDerr: partido.defensaDerr.id,
                delanteroDerr: partido.delanteroDerr.id,
                eloObtenido: partido.eloObtenido,
                fecha: Date.now()
            });
        }
        saveMatch();
        return Promise.all(updatePromises);
    })
    .catch((error) => {
        console.error(error);
        return null;
    });

}