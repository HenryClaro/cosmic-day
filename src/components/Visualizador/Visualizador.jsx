import styles from './styles.module.css'


function Visualizador(props) {
  const foto = props.foto
  const imagem = foto.hdurl || foto.url



  
  const data = foto.date.split('-')
  const dataFormatada = data[2] + '/' + data[1] + '/' + data[0]

  const documento = new DOMParser().parseFromString(
    foto.explanation || '',
    'text/html'
  )
  const explicacao = documento.body.textContent ||
    'No description available.'

  
  return (
    <div className={styles.fundo} onClick={props.fechar}>
      {}
      <div
        className={styles.janela}
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <button
          type="button"
          className={styles.fechar}
          onClick={props.fechar}
          aria-label="Fechar imagem"
        >
          ×
        </button>

        <div className={styles.areaImagem}>
          <img
            className={styles.imagem}
            src={imagem}
            alt={foto.title}
          />
        </div>


        

        {}
        <div className={styles.areaTexto}>
          <span className={styles.data}>{dataFormatada}</span>
          <h2>{foto.title}</h2>
          <h4>About this image</h4>
          <p>{explicacao}</p>

          {}
          <a
            className={styles.botao}
            href={imagem}
            target="_blank"
            rel="noreferrer"
          >
            Abrir imagem em tela cheia
          </a>
          <small>Fonte: NASA APOD</small>
        </div>
      </div>
    </div>
  )
}

export default Visualizador
