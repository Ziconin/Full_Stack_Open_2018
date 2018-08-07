const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))



morgan.token('content', function(req, res) {return JSON.stringify(req.body)})
app.use(morgan(function(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.content(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('build/index.html')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  const count = persons.length
  res.send(`Puhelinluettelossa ${count} henkilön tiedot.<br /> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if(body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'Name or number missing'})
  }

  /*if(persons.filter(person => person.name === body.name).length !== 0) {
    return res.status(400).json({error: 'Name must be unique'})
  }*/

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPer => {
      res.json(Person.format(savedPer))
    })
    .catch(error => {
      console.log(error)
    })
})

const error = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(error)

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
