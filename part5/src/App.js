import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username,password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      console.log('user',user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      },5000)
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='button-login' type="submit">login</button>
    </form>
  )

  const listaBlogs = () => {
    blogs.sort((a,b) => {return(b.likes-a.likes)})
    console.log('blogs',blogs)
    return (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} blogService={blogService} blogServiceUpdate={blogService.update} />
      )
    )}

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notificationMessage={notificationMessage} />
        <div>{loginForm()}</div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Blogs</h2>
        <div>
          <Notification notificationMessage={notificationMessage}/>
        </div>
        <div>
          <div>
            <form onSubmit={handleLogout}>
              {user.name} logged in <button id='logout-button' type='submit'>logout</button> <br/>
            </form>
          </div>
          <CreateBlogForm setNotificationMessage={setNotificationMessage} blogServiceCreate={blogService.create}/>
          <div>
            {listaBlogs()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
