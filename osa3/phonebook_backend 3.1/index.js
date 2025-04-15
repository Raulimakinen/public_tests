require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const { Person } = require('./models/person')
const errorHandler = (error,req,res,next) =>{
  console.error(error.message)
  if (error.name === 'CastError'){
    return res.status(400).send({error: 'malformatted id'})
} else if 
  (error.name==='ValidationError') {
    return res.status(400).json({ error: error.message })
  }
next(error)
}





app.use(cors())
app.use(express.static('dist'))
app.use(express.json())




morgan.token('contents' , function getContents(req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :contents'))


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => 
  Person.find({})
.then(persons => {
   res.json(persons) 
    })
   .catch(error => next(error))
)

app.get('/api/persons/:id', (req, res, next)=> {
  Person.findById(req.params.id)
  .then(person=> {
    if (person) {
     res.json(person)
  } else {
    res.status(404).end()
  }
  })
  .catch(error=>next(error))
})


app.put('/api/persons/:id', (req, res, next)=> {
  const {name,number} = req.body
  Person.findById(req.params.id)
  .then(person=> {
    if(!person) {
      return res.status(404).end()
    }
    person.name=name
    person.number=number

    return person.save().then(updatedPerson => {
    res.json(updatedPerson)
  })
})
  .catch(error =>next(error))
})



const generateId = () => {
 return Math.floor(Math.random()*50000)
}

app.post('/api/persons',(req,res,next)=> {
  const {name, number} = req.body

  if (!name || !number ){
    return res.status(400).json({error:'No contact info given!'})
  }
const person = new Person({ name, number })

person.save()
.then(savedPerson => res.json(savedPerson))
.catch(error => {
   if (error.name === 'ValidationError') {
    return res.status(400).json ({ error: error.message })
  }
  next(error)
})
})


app.delete('/api/persons/:id',(req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
})  
    .catch(error => next(error))
})

app.get('/api/info',(req,res)=> {
  Person.countDocuments({})
  .then(count=> {
    const timestamp = new Date().toUTCString()
    res.send(`<p>Phonebook has info for ${count} people </p>
        <p>${timestamp}</p>`)
  })
  .catch(error => next(error))
                 
})



app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log("cheking server log")
  console.log(`Server running on port ${PORT}`)
  
})