require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
morgan.token('person',function (request) {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.static('build'))
/*
let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
*/




const Person = require('./models/person')
app.get('/info', (request, response) => {
  Person
    .estimatedDocumentCount()
    .then(docCount => {
      console.log('docCount',docCount)
      response.send(`<p>phone book has info for ${docCount} people <p/>
    <p>${new Date()}<p/>`)
    })
    .catch(err => {
      console.log(err)
    })
})
app.get('/api/persons',(request, response) => {
  Person.find({}).then(persons => response.json(persons))
})
app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {
    if (person){
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => {next(error)})
})
app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
/*const generateId = () => {
    const aleatorio = persons.length > 0 ? Math.floor((Math.random() * (1000)) + 1) : 0
    return aleatorio
}
*/
app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id,person,{ new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
app.post('/api/persons', (request, response,next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  else if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else {
    /* const person = request.body
    person.id = generateId()
    */
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => {next(error)})}
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
