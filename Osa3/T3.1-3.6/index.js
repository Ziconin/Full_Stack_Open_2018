const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const count = persons.length
  res.send(`Puhelinluettelossa ${count} henkilön tiedot.<br /> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const genId = Math.floor(Math.random() * 1000)
  return genId
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  if(body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'Name or number missing'})
  }

  if(persons.filter(person => person.name === body.name).length !== 0) {
    return res.status(400).json({error: 'Name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
