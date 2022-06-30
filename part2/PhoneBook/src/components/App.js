import React, { useState, useEffect } from 'react'
import Filtro from './Filtro'
import PersonsForm from './PersonsForm'
import Numbers from './Numbers'
import Notification from './notification'
import phoneService from '../services/axiosFunctions'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newPhone,setNewPhone] = useState('')
  const [show,setShow] = useState('')
  const [added,setAddedMessage] = useState('')
  useEffect(() => {
    console.log('effect')
    phoneService
        .getAll()
        .then(initialPhones => {
          setPersons(initialPhones) 
      })
  }, [])
  console.log('render', persons.length, 'persons')
  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked",event.target)
    const phoneObject = {
      "name": newName,
      "number":newPhone
    }
    console.log("filtro",persons.filter((valor) => valor.name === newName))
    if (persons.filter((valor) => valor.name === newName).length >= 1){
      const repetido = persons.filter((valor) => valor.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)){
            console.log("Reemplazar")
            phoneService.putRequest(repetido[0].id,phoneObject).then(response => setPersons(persons.map((valor) => valor.name !== repetido[0].name ? valor : response)))
            .catch(error => {setAddedMessage(`Information of ${newName} has already been removed from server`)})
            setAddedMessage(`${newName}'s number has been replaced`)
            setNewName('')
            setNewPhone('')
            setTimeout(() => {setAddedMessage(null)},5000)
            
            
      }
    }
    else {
      console.log(persons)
      phoneService
          .create(phoneObject)
          .then(returnedPhone =>{
            setPersons(persons.concat(returnedPhone))
          })
      setAddedMessage(`Added ${newName}`)
      setTimeout(() => {setAddedMessage(null)},5000)
      setNewName('')
      setNewPhone('')
      }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleShowChange = (event) => {
    setShow(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={added} />
        <Filtro personas={persons} entrada={show} handleShowChange={handleShowChange} />
      <h3>add a new</h3>
      <PersonsForm addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h3>Numbers</h3>
      <Numbers persons={persons} setPersons={setPersons} added={added} setAddedMessage={setAddedMessage} />
    </div>
  )
}
export default App
