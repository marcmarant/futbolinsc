import { algoritmoElo } from './algoritmoElo';
import { getPlayerRef, newMatchRef, getCuentaRef } from '../config/firebase';
import { getDoc, updateDoc, setDoc } from 'firebase/firestore';

export function guardarPartido(partido, authorUid) {

    const getAuthorId = async () => {
        const cuentaRef = getCuentaRef(authorUid);
        try {
            const snapShot = await getDoc(cuentaRef);
            const data = snapShot.data();
            const authorId = data.elo_id;
            return authorId;
        }
        catch(error) {
            console.error(error);
        }
    }

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
            const fechaActual = Date.now() // Date.now() devuelve el unix time actual en tipo number
            const fechaInversa = 10000000000000-fechaActual
            /* En fechaInversa se obtendra una fecha anterior cuanto mas posterior sea fechaActual, siendo 0 el 20/11/2286 a las 18:46:40 GMT+1 */
            await setDoc(newMatchRef(fechaInversa.toString()), { // Es necesario que el parametro de newMatchRef sea de tipo string
                defensaVic: partido.defensaVic.id,
                delanteroVic: partido.delanteroVic.id,
                defensaDerr: partido.defensaDerr.id,
                delanteroDerr: partido.delanteroDerr.id,
                eloObtenido: partido.eloObtenido,
                autor: await getAuthorId(),
                fecha: fechaActual // fecha debe ser de tipo number
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