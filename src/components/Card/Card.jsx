import { useState } from 'react'
import Visualizador from '../Visualizador/Visualizador'
import styles from './styles.module.css'


function Card(props) {
  const foto = props.foto

  
  const [aberto, setAberto] = useState(false)

  
  const imagem = foto.hdurl || foto.url
  const data = foto.date.split('-')
  const dataFormatada = data[2] + '/' + data[1] + '/' + data[0]

  return (
    <div className={styles.card}>
      {}
      {foto.media_type === 'image' && imagem ? (
        <button
          type="button"
          className={styles.botaoImagem}
          onClick={() => setAberto(true)}
        >
          {}
          <img
            className={styles.imagem}
            src={imagem}
            alt={foto.title}
            loading="lazy"
          />
        </button>
      ) : (
        <div className={styles.semImagem}>
          <p>Imagem indisponível ou publicação em vídeo.</p>
        </div>
      )}

      {}
      <div className={styles.conteudo}>
        <span>{dataFormatada}</span>
        <h3>{foto.title}</h3>
      </div>

      {}
      {aberto && (
        <Visualizador
          foto={foto}
          fechar={() => setAberto(false)}
        />
      )}
    </div>
  )
}

export default Card
