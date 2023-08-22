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
    
    // Elo medio pareja vencedora/perdedora
    const eVic = Math.floor((partido.defensaVic.data.defensa + partido.delanteroVic.data.ataque)/2);
    const eDerr = Math.floor((partido.defensaDerr.data.defensa + partido.delanteroDerr.data.ataque)/2);
    // Porcentaje de victoria de la pareja vencedora/perdedora
    const pVic = Math.floor((1+10^((eDerr-eVic)/400))*100)/100
    const pDerr = Math.floor((1+10^((eDerr-eVic)/400))*100)/100
    // Elo ganado/perdido por la pareja vencedora/perdedora (facor de multiplicacion 32)
    const wVic = 32*(1-pVic)
    const wDerr = 32*(-pDerr)

    // Se suma el elo ganado/perdido a todos los jugadores en su respectiva posicion
    partido.delanteroVic.data.ataque += wVic;
    partido.defensaVic.data.defensa += wVic;
    partido.delanteroDerr.data.ataque += wDerr;
    partido.defensaDerr.data.defensa += wDerr;

    return partido;

}