export function algoritmoElo(partido) {

    /* Estructura de partido:

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
    
    // Elo medio pareja vencedora
    const eloVic = Math.round((partido.defensaVic.data.defensa + partido.delanteroVic.data.ataque)/2);
    // Elo medio pareja perdedora
    const eloDerr = Math.round((partido.defensaDerr.data.defensa + partido.delanteroDerr.data.ataque)/2);

    const difElo = eloVic - eloDerr;

    if (difElo > 0) { // Gano la pareja con el elo mas alto
        const eloGanado = difElo;
    } else if (difElo < 0) { // Gano la pareja con el elo mas bajo
        const eloGanado = -difElo;
    }

    partido.defensaDerr.data.defensa -= difElo;
    partido.delanteroDerr.data.ataque -= difElo;
    partido.defensaVic.data.defensa += difElo;
    partido.delanteroVic.data.ataque += difElo;

    return partido;

}