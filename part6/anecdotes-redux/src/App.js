import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/Filter'
import Notification from './components/Notification'
import { initialAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialAnecdotes())
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <VisibilityFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App