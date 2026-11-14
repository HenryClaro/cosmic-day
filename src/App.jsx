
import { useState } from 'react'
import Formulario from './components/Formulario/Formulario'
import Card from './components/Card/Card'
import './App.css'

function App() {

  const [dia, setDia] = useState('')
  const [mes, setMes] = useState('')
  const [ano, setAno] = useState('')

  const [fotos, setFotos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')





  async function buscarFoto(data) {
    const partes = data.split('-')
    const dataCurta = partes[0].slice(2) + partes[1] + partes[2]

    const url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/${dataCurta}?api_key=DEMO_KEY`

    
    const resposta = await fetch(url)

    if (!resposta.ok) {
      throw new Error('Erro ao consultar a NASA')
    }

    const resultado = await resposta.json()
    const foto = Array.isArray(resultado) ? resultado[0] : resultado

    if (!foto || foto.date !== data) {
      throw new Error('A NASA retornou outra data')
    }

    return foto
  }

  




  function validarData() {
    if (!dia || !mes || !ano) {
      return false
    }

    const data = new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia)
    )

    const hoje = new Date()

    if (Number(ano) < 1995 || data > hoje) {
      return false
    }

    if (
      data.getDate() !== Number(dia) ||
      data.getMonth() !== Number(mes) - 1 ||
      data.getFullYear() !== Number(ano)
    ) {
      return false
    }

    return true
  }

  // pesquisar o mesmo dia e mês em vários anos, função principal
  async function buscarPublicacoes(evento) {

   
    evento.preventDefault()

    if (!validarData()) {
      setFotos([])
      setMensagem('Informe uma data e um ano inicial válidos.')
      return
    }

    setFotos([])
    setCarregando(true)
    setMensagem('Explorando o arquivo espacial da NASA...')

    const encontradas = []
    let falhas = 0
    const anoAtual = new Date().getFullYear()

   


    //percorrer os anos
    for (let i = Number(ano); i <= anoAtual; i++) {

      const data = i + '-' +
        mes.padStart(2, '0') + '-' +
        dia.padStart(2, '0')

      const dataPesquisa = new Date(
        i,
        Number(mes) - 1,
        Number(dia)
      )

      // limitação
      if (data < '1995-06-16' || dataPesquisa > new Date()) {
        continue
      }

      if (
        dataPesquisa.getDate() !== Number(dia) ||
        dataPesquisa.getMonth() !== Number(mes) - 1
      ) {
        continue
      }




      // buscando as publicacoes
      try {
        const foto = await buscarFoto(data)

        // adicionando
        encontradas.push(foto)

      
        setFotos([...encontradas])

      } catch (erro) {
        falhas++
        console.log('Erro na data:', data, erro)
      }
    }

    setCarregando(false)

    if (encontradas.length === 0) {
      setMensagem('Não foi possível carregar as publicações.')
    } else {
      let texto = encontradas.length + ' publicações encontradas.'

      if (falhas > 0) {
        texto += ' ' + falhas + ' consultas falharam.'
      }

      setMensagem(texto)
    }
  }





  return (
    <main className="pagina">

      <section className="inicio">

        <h1>Cosmic Day</h1>

        <p className="descricao">
          Um dia. Vários anos. Um universo de descobertas.
        </p>

        <p className="instrucao">
          Escolha uma data especial e descubra o que a NASA
          publicou nesse mesmo dia ao longo dos anos.
        </p>

        <Formulario
          dia={dia}
          mes={mes}
          ano={ano}
          setDia={setDia}
          setMes={setMes}
          setAno={setAno}
          carregando={carregando}
          buscarPublicacoes={buscarPublicacoes}
        />

      </section>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {fotos.length > 0 && (
        <section className="resultados">

          <h2>Sua viagem pelo tempo</h2>

          <div className="galeria">
            {}
            {fotos.map((foto) => (
              <Card key={foto.date} foto={foto} />
            ))}
          </div>

        </section>
      )}

      <footer>
        Imagens e informações fornecidas pela API APOD da NASA.
      </footer>

    </main>
  )
}

export default App
