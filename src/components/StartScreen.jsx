import './StartScreen.css'

const StartScreen = ({iniciarJogo}) => {
  return (
    <div>
        <h1>Iniciar Jogo!</h1>
        <button onClick={iniciarJogo}>Iniciar</button>
    </div>
  )
}

export default StartScreen