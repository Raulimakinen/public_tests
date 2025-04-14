const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)

console.log('connecting to' , url)
mongoose.connect(url)
.then(result => {
  console.log('yhdistetty MongoDB')

.catch((error) => {
  console.log('Virhe yhdistettäessä Mongoon', error.message)
})
})

const personSchema = new mongoose.Schema({
  name :{type:String,
          required:true,
  },
  number:{type:String ,
          required:true,
  } 
})

personSchema.set('toJson',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnerobject.__v
  }
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result =>{
    result.forEach(person=> {
      console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]


const person = new Person({
  name,
  number,
})


person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
}) 

}
 


  
module.exports = mongoodr.mofrl(Person, personSchema)