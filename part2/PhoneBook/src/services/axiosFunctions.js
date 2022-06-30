import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
const borrar = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
const putRequest = (id,obj) => {
    const request = axios.put(`${baseUrl}/${id}`,obj)
    return request.then(response => response.data)
  }
const phoneService = {
    getAll: getAll, 
    create: create, 
    borrar: borrar,
    putRequest: putRequest
  }
  export default phoneService