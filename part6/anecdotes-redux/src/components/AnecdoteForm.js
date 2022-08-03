import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";
const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`Anecdote '${content}' created`,10)
      }
return (
    <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
    </form>
)
}
const mapDispatchToProps = {
    setNotification,
    createAnecdote
}

export default connect(
    null,
    mapDispatchToProps  
)(AnecdoteForm)