const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', request => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = 
[
    {
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": "1"
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": "2"
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": "3"
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": "4"
    }
  ]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>phone book has ${persons.length} people</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(!person) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {

  const person = request.body
  
  const isName = persons.find(p => p.name === person.name)

  if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if(isName) {
    return response.status(400).json({ error: 'name is already in database' })
  }

  person.id = Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(1)) + Math.ceil(1))
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})