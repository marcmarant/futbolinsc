import { PlayerPick } from './PlayerPick'

export const MatchView = () => {

  return (
    <div className='MatchView'>
      <div className='head_div'>
        <h3>Ultimos partidos</h3>
        <div>
          {/* TODO: <option> para ordenamiento */}
          <PlayerPick placeholder='Filtrar'/>
        </div>
      </div>
      {/* TODO: Desplegar componentes <Match /> */}
    </div>
  )
}
