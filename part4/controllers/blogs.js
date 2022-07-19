const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/',async (request,response) => {
    const blogs = await Blog.find({}).populate('user', { "username":1, "name":1 })
    response.json(blogs)
})
blogsRouter.get('/:id',async (request,response) => {
    const blog = await Blog.findById(request.params.id)
    
        if (blog){
            response.json(blog.toJSON())
        }
        else {
            response.status(404).end()
        }
}
    
)

blogsRouter.post('/',async (request,response,next) => {
    const body = request.body
    
    if (!body.hasOwnProperty('likes')){
        body.likes = 0
    }
    if ((!body.hasOwnProperty('title')) || (!body.hasOwnProperty('url'))){
        response.status(400).end()
    }
    else {
    const token = request.token
    const decodedToken = jwt.verify(token,process.env.SECRET)
    if (!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: decodedToken.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
    }
})
blogsRouter.delete('/:id',async (request,response,next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({error: 'token missing'})
    }
    try {
    const decodedToken = await jwt.verify(token,process.env.SECRET)
    
    if (!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    } catch(exception){
        next(exception)
    }
})
blogsRouter.put('/:id',async (request,response,next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
    response.json(updatedBlog)
    
})
module.exports = blogsRouter