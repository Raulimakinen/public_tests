const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')



app.use(cors())
app.use(express.json())

morgan.token('contents' , function getContents(req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :contents'))

let persons = [
    {   id:"1",
        name: 'Arto Hellas', 
        number: '040-123456' 
    },
    {   id:"2",
        name: 'Ada Lovelace',
        number: '39-44-5323523'
         },
    {   id:"3",
        name: 'Dan Abramov',
        number: '12-43-234345' 
        },
    {   id:"4",
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
     }
  ]



app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response)=> {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
     response.json(person)
  } else {
    response.status(404).end()
  }
  }
)

const generateId = () => {
 return Math.floor(Math.random()*50000)
}

app.post('/api/persons',(request,response)=> {
  const body = request.body

  if (!body.name || !body.number ){
    return response.status(400).json({error:'No contact info given!'})
  }


  const nameExists = persons.some(person=> person.name === body.name)
  if (nameExists) {
    return response.status(409).json({error:'Contact already on phonebook!'})
  }

  const person =  {
    id: generateId(),
    name: body.name,
    number: body.number,
    
  }
  persons = persons.concat(person)
  response.json(person)
})


app.delete('/api/persons/:id',(request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
 
})

app.get('/api/info',(request,response)=> {
    const counter = persons.length
    const timestamp = new Date().toUTCString()
    response.send(`<p>Phonebook has info for ${counter} people </p>
        <p>${timestamp}</p>`)
                    
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("cheking server log")
  console.log(`Server running on port ${PORT}`)
  
})