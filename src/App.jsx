import './App.css'
import { useEffect, useState } from 'react'
import Game from './components/Game'
import GameOver from './components/GameOver'
import StartScreen from './components/StartScreen'
import { wordsList } from './data/words'

const estagios = [
  {id: 0, nome: 'start'},
  {id: 1, nome: 'game'},
  {id: 2, nome: 'gameover'}
]

const qtdChances = 3

function App() {
  const [estagio, setEstagio] = useState(estagios[0].nome)
  const [palavras] = useState(wordsList)
  const [palavraEscolhida, setPalavraEscolhida] = useState('')
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('')
  const [letras, setLetras] = useState([])

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [chances, setChances] = useState(qtdChances)
  const [pontos, setPontos] = useState(0)


  const pegarPalavraECategoria = () => {
    // Pegando uma categoria de forma randomica
    const categorias = Object.keys(palavras)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]

    // Pegando uma palavra de forma randomica
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]

    return {categoria, palavra}
  }

  
  const iniciarJogo = () =>{
    // limpando os arrays de letras para o game começar todo em branco
    limpaArrayLetras()
    // desestrutura CATEGORIA e PALAVRA retornada pelo função pegarPalavraECategoria
    const {categoria, palavra} = pegarPalavraECategoria()

    // Criando um array com as letras separadas da palavra escolhida
    let letrasPalavra = palavra.split('')
    letrasPalavra = letrasPalavra.map((l) => l.toLowerCase())

    setCategoriaEscolhida(categoria)
    setPalavraEscolhida(palavra)
    setLetras(letrasPalavra)

    setEstagio(estagios[1].nome)
  }

  const jogo = (letraDigitada) => {
    // Transformando a letra digitada em minuscula
    const letraMinuscula = letraDigitada.toLowerCase()
    
    // checa se a letra digitada já foi foi usanda antes, se sim a função apenas da um return
    if(letrasAdivinhadas.includes(letraMinuscula) || letrasErradas.includes(letraMinuscula)) {
      return
    }

    if(letras.includes(letraMinuscula)) {
      // Unindo a letra digitada ao array de letras acertadas
      setLetrasAdivinhadas((letrasAdivinhadasAtualmente) => [
        ...letrasAdivinhadasAtualmente, letraMinuscula
      ])
    } else {
      // Unindo a letra digitada ao array de letras erradas
      setLetrasErradas((letrasErradasAtualmente) => [
        ...letrasErradasAtualmente, letraMinuscula
      ])

      // diminuindo as chances de jogadas
      setChances((chancesAtuais) => chancesAtuais - 1)
    }
  }

  const limpaArrayLetras = () => {
    setLetrasAdivinhadas([])
    setLetrasErradas([])
  }
  
  // checa se as chances acabaram => GAMEOVER
  useEffect(() => {
    if(chances <= 0) {
      // Limpa todos os states
      limpaArrayLetras()
      // Muda de estágio
      setEstagio(estagios[2].nome)
    }
  }, [chances])

  // checa se a palavra foi acertada => ADICIONA PONTOS
  useEffect(() => {
    // array de letras unicas
    const letrasUnicas = [...new Set(letras)]

    // condição se acertar a palavra
    if(letrasAdivinhadas.length === letrasUnicas.length) {
      // add pontos
      setPontos((pontosAtuais) => pontosAtuais += 100)

      // reinicia o jogo com uma nova palavra
      iniciarJogo()
    }

  }, [letrasAdivinhadas])

  const fimDeJogo = () => {
    setPontos(0)
    setChances(qtdChances)

    setEstagio(estagios[0].nome)
  }



  return (
    <div className="App">
      {estagio === 'start' && <StartScreen iniciarJogo={iniciarJogo} />}
      {estagio === 'game' && 
        <Game 
          jogo={jogo}
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          chances={chances}
          pontos={pontos}


        
      />}
      {estagio === 'gameover' && <GameOver fimDeJogo={fimDeJogo} pontos={pontos}/>}
    </div>
  )
}

export default App
