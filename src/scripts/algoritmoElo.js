export function getProb(eVic, eDerr) {
    const pVic = (1/(1+Math.pow(10, (eDerr-eVic)/1000))).toFixed(3)
    const pDerr = (1-pVic).toFixed(3);
    return {pVic, pDerr}
}

export function algoritmoElo(partido) {
    // Elo medio pareja vencedora/perdedora
    const eVic = Math.floor((partido.defensaVic.data.defensa + partido.delanteroVic.data.ataque)/2);
    const eDerr = Math.floor((partido.defensaDerr.data.defensa + partido.delanteroDerr.data.ataque)/2);
    // Porcentaje de victoria de la pareja vencedora/perdedora
    const pDerr = getProb(eVic, eDerr).pDerr
    // Elo ganado/perdido por la pareja vencedora/perdedora (factor de multiplicacion 3, factor de crecimiento 6)
    const wVic = Math.ceil(Math.pow(3*(pDerr), 6));
    const wDerr = -wVic;
    // Se suma el elo ganado/perdido a todos los jugadores en su respectiva posicion
    partido.delanteroVic.data.ataque += wVic;
    partido.defensaVic.data.defensa += wVic;
    partido.delanteroDerr.data.ataque += wDerr;
    partido.defensaDerr.data.defensa += wDerr;
    partido.eloObtenido = wVic;

    return partido;
} 