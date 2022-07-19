const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: "Blog",
        author: "Juan",
        url: "saifsdihfisfh",
        likes: 6,
        id: "62ceebccac7763954736c11a"
        },
        {
        title: "Blog",
        author: "Pedro",
        url: "saifsdihfuyguygisfh",
        likes: 6,
        id: "62cf1151e541ce39475ab911"
        }
]
const initialUsers = [
  {
    username: "Hellas",
    name: "Arto Hellas",
    passwordHash: "12"
  },
  {
    username: "je",
    mame: "Juan",
    passwordHash: "123456"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
  await userObject.save()
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})
test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
test('identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
test('blog added', async () => {
    let newBlog = {
        title: "Blog 5",
        author: "Maria",
        url: "fyvgsdfivhsiyh",
        likes: 25
        }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const response = await api.get('/api/blogs')
    
    const blogs = response.body
    newBlog.id = blogs.filter((valor) => valor.author === 'Maria')[0].id
    expect(blogs).toHaveLength(initialBlogs.length + 1)
    expect(blogs).toContainEqual(
        newBlog
    )
  })
test('blog without likes (0 by default)',async () => {
    let newBlog = {
        title: "Blog 6",
        author: "Carlos",
        url: "fasdfsdgyvgssiyh"
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs[blogs.length-1].likes).toBe(0)
})
test('blog without title', async () => {
    const newBlog = {
            author: "Maria",
            url: "fasdfsddfghdhgyvgssiyh",
            likes:4
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    

}) 
test('blog without url', async () => {
    const newBlog = {
        title: 'Blog 6',
        author: "Maria",
        likes: 4
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
}) 
test('password with less than 3 characters', async () => {
  await api.post('/api/users').send(initialUsers[0]).expect(400)
  const response = await api.get('/api/users')
  const users = response.body
  expect(users).toHaveLength(users.length)
})
test('username with less than 3 characters', async () => {
  await api.post('/api/users').send(initialUsers[1]).expect(400)
  const response = await api.get('/api/users')
  const users = response.body
  expect(users).toHaveLength(users.length)
})

afterAll(() => {
  mongoose.connection.close()
})

