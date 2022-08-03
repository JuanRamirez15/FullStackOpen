import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ANECDOTE':
      return [...state,action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote: changedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data:{
        content: newAnecdote.content,
        votes: 0,
        id: newAnecdote.id
    }
    })
   initialAnecdotes()
  }
}
export const vote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: {id:anecdote.id}
    })
  }
}
export const initialAnecdotes = () => {
  return async  dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default reducer