import { getProb } from './algoritmoElo';
import { getPlayer } from '../config/firebase';
import { getDoc } from 'firebase/firestore';

export function getData(partido) {

    /* Estructura de partido:

        partido = { 
            defensaVic, 
            delanteroVic, 
            defensaDerr, 
            delanteroDerr
        } 
    */

    const promises = []; // Array de promesas de obtencion de los documentos mediante getDoc
    const undefinedPlayers = []; // Array con los jugadores cuyo valor es undefined

    for (const player in partido) {
        if (partido[player] != '') { 
            const playerRef = getPlayer(partido[player]);
            const promise = getDoc(playerRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data();
                    partido[player] = data;
                } else {
                console.log(`El jugador con ID ${partido[player]} no existe`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
            promises.push(promise);
        } else {
            undefinedPlayers.push(player)
        }
    }

    return Promise.all(promises)
    .then(() => {
        let eloVic, eloDerr, probVic, probDerr = null
        if (!undefinedPlayers.includes('defensaVic') && !undefinedPlayers.includes('delanteroVic')) {
            eloVic = Math.floor((partido.defensaVic.defensa + partido.delanteroVic.ataque)/2);
        }
        if (!undefinedPlayers.includes('defensaDerr') && !undefinedPlayers.includes('delanteroDerr')) {
            eloDerr = Math.floor((partido.defensaDerr.defensa + partido.delanteroDerr.ataque)/2);
        }
        if (undefinedPlayers.length === 0) {
            let prob = getProb(eloVic, eloDerr);
            probVic = prob.pVic
            probDerr = prob.pDerr
        }
        return {eloVic, eloDerr, probVic, probDerr
        }
    })
    .catch((error) => {
        console.error(error);
        return null;
    });

}