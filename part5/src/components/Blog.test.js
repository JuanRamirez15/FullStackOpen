import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

describe('Blog testing', () => {
  test('only title and author', () => {
    const user = {
      username: 'jerr1998',
      name: 'Juan',
      id: '1234'
    }
    const blog = {
      author: 'Carlos',
      id: '56789',
      likes: 20,
      title: 'Blog 70',
      url: 'url aca',
      user: user
    }
    const component = render(
      <Blog blog={blog} user={user} />
    )
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.likes)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.user)
  })
  test('when click (view button), show title, author, url, likes', () => {
    const user = {
      username: 'jerr1998',
      name: 'Juan',
      id: '1234'
    }
    const blog = {
      author: 'Carlos',
      id: '56789',
      likes: 20,
      title: 'Blog 70',
      url: 'url aca',
      user: user
    }
    const component = render(
      <Blog blog={blog} user={user}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.url)

  })
  test('Like button executed two times', () => {
    const user = {
      username: 'jerr1998',
      name: 'Juan',
      id: '1234'
    }
    const blog = {
      author: 'Carlos',
      id: '56789',
      likes: 20,
      title: 'Blog 70',
      url: 'url aca',
      user: user
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} blogServiceUpdate={mockHandler} />
    )
    const button1 = component.getByText('view')
    fireEvent.click(button1)
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  test('testing <CreateBlogForm/>', () => {
    const setNotificationMessage = jest.fn()
    const blogServiceCreate = jest.fn()
    const component = render(
      <CreateBlogForm setNotificationMessage={setNotificationMessage} blogServiceCreate={blogServiceCreate} />
    )
    const createButton = component.getByText('new blog')
    fireEvent.click(createButton)
    component.debug()
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(inputTitle, {
      target: { value: 'Blog 100' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Juan Esteban' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'una url aca' }
    })
    fireEvent.submit(form)
    expect(blogServiceCreate.mock.calls).toHaveLength(1)
    expect(blogServiceCreate.mock.calls[0][0]).toEqual({ title: 'Blog 100', author: 'Juan Esteban', url: 'una url aca' })
  })
})