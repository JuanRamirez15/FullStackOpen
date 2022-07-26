
import { useState } from 'react'

const Blog = ({ blog, user, blogService, blogServiceUpdate }) => {
  const [view,setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const userVerifyRemove = () => {
    if (blog.user.username === user.username){
      return (
        <button id='remove-button' onClick={ async () => {
          if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)){
            await blogService.deleteBlog(blog.id)
            window.location.reload()
          }
        }}>remove</button>
      )
    }
  }

  if (view === false){
    return(
      <div className='blogStyle' style={blogStyle}>
        {blog.title} {blog.author} <button id='blog-test' onClick={() => setView(true)}>view</button>
      </div>)
  }
  else {
    return (
      <div className='blogStyle' style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setView(false)}>hide</button> <br/>
        {blog.url} <br/>
        likes {blog.likes} <button id='like-test' onClick={async () => {await blogServiceUpdate(
          {
            id: blog.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
          }
        )
        window.location.reload() }}>like</button> <br/>
        {blog.user.name} <br/>
        {userVerifyRemove()}

      </div>
    )

  }
}

export default Blog