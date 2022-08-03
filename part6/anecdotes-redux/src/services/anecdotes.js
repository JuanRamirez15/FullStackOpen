import axios from 'axios'
import { initialAnecdotes } from '../reducers/anecdoteReducer'
const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  initialAnecdotes()
  return response.data
}
const vote = async (anecdote) => {
  const object = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  }
  object.votes = object.votes + 1
  await axios.put(`${baseUrl}/${object.id}`,object)
  
}
export default { getAll, createNew, vote }