import PropTypes from 'prop-types'
import { useState } from 'react'
const CreateBlogForm = ( {
  setNotificationMessage, blogServiceCreate
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [hide, setHide] = useState(true)

  const addBlogsForm = async (event) => {
    event.preventDefault()
    console.log('Created')
    console.log('title',title,'author',author,'url',url)
    const newObject = {
      title: title,
      author: author,
      url: url
    }
    await blogServiceCreate(newObject)
    setNotificationMessage(`a new blog ${title} by ${author} added`)
    setHide(true)
    setTimeout(() => setNotificationMessage(null),5000)
    setTimeout(() => window.location.reload(),5000)
  }
  if (hide === true){
    return (
      <div>
        <button onClick={() => setHide(false)}>new blog</button>
      </div>
    )
  }
  return (
    <div>
      <h2>Create</h2>
      <form onSubmit={addBlogsForm}>
        title: <input id='title' type='text' value={title} name='title' onChange={({ target }) => setTitle(target.value)}></input> <br/>
        author: <input id='author' type='text' value={author} name='author' onChange={({ target }) => setAuthor(target.value)}></input> <br/>
        url: <input id='url' type='text' value={url} name='url' onChange={({ target }) => setUrl(target.value)}></input> <br/>
        <button type='submit'>create</button> <br/>
      </form>
      <button onClick={() => {setTitle('');setAuthor('');setUrl('');setHide(true)}}>cancel</button> <br/>
    </div>
  )
}
CreateBlogForm.propTypes = {
  blogServiceCreate: PropTypes.func.isRequired
}

export default CreateBlogForm