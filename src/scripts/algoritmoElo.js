export function getProb(eVic, eDerr) {
    const pVic = (1/(1+Math.pow(10, (eDerr-eVic)/1000))).toFixed(3);
    const pDerr = (1-pVic).toFixed(3);
    return {pVic, pDerr};
}

export function getEloWon(pDerr) {
    return Math.ceil(Math.pow(3*(pDerr), 6));
}

export function algoritmoElo(partido) {
    // Elo medio pareja vencedora/perdedora
    const eVic = Math.floor((partido.defensaVic.data.defensa + partido.delanteroVic.data.ataque)/2);
    const eDerr = Math.floor((partido.defensaDerr.data.defensa + partido.delanteroDerr.data.ataque)/2);
    // Porcentaje de victoria de la pareja vencedora/perdedora
    const pDerr = getProb(eVic, eDerr).pDerr
    // Elo ganado/perdido por la pareja vencedora/perdedora (factor de multiplicacion 3, factor de crecimiento 6)
    const wVic = getEloWon(pDerr);
    const wDerr = -wVic;
    // Se guarda el anterior ELO de la pareja victoriosa
    const prevEloDel = partido.delanteroVic.data.ataque
    const prevEloDef = partido.defensaVic.data.defensa
    // Se suma el elo ganado/perdido a todos los jugadores en su respectiva posicion
    partido.delanteroVic.data.ataque += wVic;
    partido.defensaVic.data.defensa += wVic;
    partido.delanteroDerr.data.ataque += wDerr;
    partido.defensaDerr.data.defensa += wDerr;
    partido.eloObtenido = wVic;
    // Se suman la derrota/victoria obtenida a cada jugador
    partido.delanteroVic.data.partidos_ganados ++;
    partido.defensaVic.data.partidos_ganados ++;
    partido.delanteroDerr.data.partidos_perdidos ++;
    partido.defensaDerr.data.partidos_perdidos ++;
    // Se comprueba si existe un record de ELO
    if (partido.delanteroVic.data.ataque > prevEloDel)
        partido.delanteroVic.data.ataque_record = partido.delanteroVic.data.ataque
    if (partido.defensaVic.data.defensa > prevEloDef)
        partido.defensaVic.data.defensa_record = partido.delanteroVic.data.defensa
        
    return partido;
} 