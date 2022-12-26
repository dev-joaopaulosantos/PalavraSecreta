import './GameOver.css'

const GameOver = ({fimDeJogo, pontos}) => {
  return (
    <div>
        <h1>Fim de Jogo</h1>
        <h2>A sua pontuação foi: <span className='pontos'>{pontos}</span></h2>
        <button onClick={fimDeJogo}>Reiniciar o Jogo</button>
    </div>
  )
}

export default GameOver