const Filtro = (props) => {
    const personas = props.personas
    const entrada = props.entrada
    const handleShowChange = props.handleShowChange
    let filtro = personas.filter((valor) => (valor.name.startsWith(entrada) || valor.name.toLowerCase().startsWith(entrada)))
    if (entrada === ''){
      filtro = []
    }
    return (
      <form>
        <div>
        <p>filter shown with <input value={entrada} onChange={handleShowChange}/></p>
        {filtro.map((val) => <p key={val.name}>{val.name} {val.number}</p>)}
        </div>
      </form>
      
    )
}
export default Filtro