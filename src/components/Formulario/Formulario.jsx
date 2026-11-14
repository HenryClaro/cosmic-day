
import styles from './styles.module.css'

function Formulario(props) {




  return (
    <form
      className={styles.formulario}
      onSubmit={props.buscarPublicacoes}
    >

      {}
      <label>
        Dia
        <input
          type="text"
          inputMode="numeric"
          maxLength="2"
          value={props.dia}
          onChange={(e) => props.setDia(e.target.value)}
          required
        />
      </label>

      <label>
        Mês
        <input
          type="text"
          inputMode="numeric"
          maxLength="2"
          value={props.mes}
          onChange={(e) => props.setMes(e.target.value)}
          required
        />
      </label>

      <label>
        Ano inicial
        <input
          type="text"
          inputMode="numeric"
          maxLength="4"
          value={props.ano}
          onChange={(e) => props.setAno(e.target.value)}
          required
        />
      </label>

      {}
      <button type="submit" disabled={props.carregando}>
        {props.carregando ? 'Explorando...' : 'Explorar'}
      </button>

    </form>
  )
}

export default Formulario
