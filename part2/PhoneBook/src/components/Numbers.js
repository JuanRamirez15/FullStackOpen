
import phoneService from '../services/axiosFunctions'
const Numbers = (props) => {
    const persons = props.persons
    const setPersons = props.setPersons
    const setAddedMessage = props.setAddedMessage
    const handleButtonDelete = (event) => {
        event.preventDefault()
      }
    const handleButtonDeleteClick = (event) => {
        const iden = parseInt(event.target.id,10)
        const borrado = persons.filter((valor) => {return(valor.id === iden)}) 
        if (window.confirm(`Delete ${borrado[0].name}`)){
            phoneService.borrar(iden)
            setPersons(persons.filter((valor) => valor.id !== borrado[0].id))
            setAddedMessage(`${borrado[0].name} deleted`)
            console.log(`Deleted ${borrado[0].name}`)
        }
    }
    return (
        <div>
        <form onSubmit={handleButtonDelete}>
        <ul>
        {persons.map((valor) => {return (<li key={valor.name}>{valor.name} {valor.number} <button type='submit' id={valor.id} onClick={handleButtonDeleteClick}>delete</button></li> )})}
        </ul>
        </form>
        </div>
    )  
}
export default Numbers