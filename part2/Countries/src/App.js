import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filtro = (props) => {
  const pais = props.pais
  const filtrados = props.filtrados
  const setFiltrados = props.setFiltrados
  if (pais === ''){
    return ('')
  }
  if (filtrados.length > 10){
    return (<p>Too many matches, specify another filter</p>)
  }
  if ((filtrados.length <= 10) && (filtrados.length >=1)){
    if (filtrados.length === 1){
      console.log("filtrados",filtrados)
      const lenguajes = []
      for (let len in filtrados[0].languages){
        lenguajes.push(filtrados[0].languages[len])
      }
      return (
        <div>
          <h1>{filtrados[0].name.common}</h1>
          <p>Capital {filtrados[0].capital[0]}</p>
          <p>Population {filtrados[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {lenguajes.map((valor) =>{ return (<li key={valor}>{valor}</li>)})}
          </ul>
          <p>{filtrados[0].flag}</p>
        </div>
      )
    }   
    return (
      filtrados.map((valor) => 
      {return(<form key={valor.name.common} ><p key={valor.name.common}>{valor.name.common} <button type='button' onClick={() => setFiltrados([valor])} >show</button></p></form>)})
    )
  }  
}
const App = () => {
  const [paises,setPaises] = useState([])
  const [pais,setPais] = useState('')
  
  const [filtrados,setFiltrados] = useState([])
  const handlePaisChange = (event) => {
    console.log("escribiendo",event.target.value)
    setPais(event.target.value)
    setFiltrados(paises.filter((valor) => {return(((valor.name.common.startsWith(event.target.value)) || valor.name.common.toLowerCase().startsWith(event.target.value)))}))
  }
  useEffect(() => {
    console.log("effect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setPaises(response.data)
      });
       /* if (filtrados.length === 1){
        axios.get(filtrados[0].flags.svg).then(response => {console.log("response.data",response.data);return(setImagen(response.data))})
        console.log(imagen) 
      } */
  }, [pais])
  console.log("render",filtrados.length,"filtrados")
  return (
    <div>
      <form >
      <p>find countries <input value={pais} onChange={handlePaisChange} /></p>
    </form>
    <Filtro pais={pais} paises={paises} setPaises={setPaises} setPais={setPais}  filtrados={filtrados} setFiltrados={setFiltrados} />
    </div>
  )
}
export default App;
