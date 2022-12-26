import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
    jogo, 
    palavraEscolhida, 
    categoriaEscolhida, 
    letras, 
    letrasAdivinhadas, 
    letrasErradas, 
    chances, 
    pontos
}) => {
    const [letraDigitada, setLetraDigitada] = useState('')
    const letraDigitadaRef = useRef(null)

    const manipularEnvio = (e) => {
        e.preventDefault()

        jogo(letraDigitada)

        setLetraDigitada('')
        letraDigitadaRef.current.focus()
    }
  return (
    <div className='jogo'>
        <p>Pontuação: <span className='pontos'>{pontos}</span></p>
        <h1>Adivinhe a palavra</h1>
        <h3>Dica sobre a palavra: <span className="dica">{categoriaEscolhida}</span></h3>
        <p>Você ainda tem <span className='chances'>{chances}</span> tentativa(s)</p>
        <div className="container-palavra">
            {letras.map((letra, i) => (
                letrasAdivinhadas.includes(letra) ? (
                    <span key={i} className='letra'>{letra}</span>
                ) : (
                    <span key={i} className='quadrado-branco'></span>
                )
            ))}
        </div>
        <div className="container-letra">
            <p>Tente adivinhar uma letra:</p>
            <form onSubmit={manipularEnvio}>
                <input 
                type='text' 
                name='letra'  
                maxLength={1} 
                required 
                onChange={(e) => setLetraDigitada(e.target.value)}
                value={letraDigitada}
                ref={letraDigitadaRef} />
                <button>Jogar!</button>
            </form>
        </div>
        <div className="container-letras-erradas">
            <p>Letras já usadas:</p>
            {/* Mapeando as LetrasErradas e mostrando na tela */}
            {letrasErradas.map((letra, i) => (
                <span className='letra-errada' key={i}>{letra}</span>
            ))}
        </div>
    </div>
  )
}

export default Game