import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from "react-redux";

const Anecdote = ({anecdote, handleVote}) => {
    return (
        <li key={anecdote.id}>
            {anecdote.content} <br/>
            has {anecdote.votes} <button id={`button ${anecdote.id}`} onClick={handleVote}>vote</button>
        </li>
    )
}
const AnecdotesList = (props) => {
    const anecdotes =() => {
        if (props.filter === ''){
            return props.anecdotes
        }
        if (props.filter !== ''){
           return props.anecdotes.filter(anecdote => (anecdote.content.toLowerCase().includes(props.filter) || anecdote.content.toLowerCase().includes(props.filter.toLowerCase()) ))
        }
    }
    return (
        <ul>
            {anecdotes().sort((a,b) => b.votes-a.votes).map(anecdote =>
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleVote={() => {props.vote(anecdote);props.setNotification(`you voted '${anecdote.content}'`,10);}}
                />
                
                )}
        </ul>
    )
} 
const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
      notification: state.notification
    }
  }
const mapDispatchToProps ={
    vote,
    setNotification
}
const ConnectedAnecdotes = connect(mapStateToProps,mapDispatchToProps)(AnecdotesList)
export default ConnectedAnecdotes