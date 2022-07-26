import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}
const update = (newObject) => {
  const id = newObject.id
  const request = axios.put(`${baseUrl}/${id}`,newObject)
  return request.then(response => response.data)
}
const deleteBlog = async  (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

export default { getAll, create, update, setToken, deleteBlog }