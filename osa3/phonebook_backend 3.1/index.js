const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const { Person } = require('./models/person')



app.use(cors())
app.use(express.json())


morgan.token('contents' , function getContents(req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :contents'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => 
  Person.find({}).then(persons => {
     res.json(persons)
    })
   
 
)

app.get('/api/persons/:id', (req, res)=> {
  Person.findById(req.params.id).then(person=> {
    if (person) {
     res.json(person)
  } else {
    res.status(404).end()
  }
  })

  
})
  

const generateId = () => {
 return Math.floor(Math.random()*50000)
}

app.post('/api/persons',(req,res)=> {
  const {name, number} = req.body

  if (!name || !number ){
    return res.status(400).json({error:'No contact info given!'})
  }
const person = new Person({ name, number })

person.save().then(savedPerson => res.json(savedPerson))

})


app.delete('/api/persons/:id',(req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
  
 
})

app.get('/api/info',(req,res)=> {
  Person.countDocuments({})
  .then(count=> {
    const timestamp = new Date().toUTCString()
    res.send(`<p>Phonebook has info for ${count} people </p>
        <p>${timestamp}</p>`)
  })
                 
})

app.use(express.static('dist'))



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("cheking server log")
  console.log(`Server running on port ${PORT}`)
  
})