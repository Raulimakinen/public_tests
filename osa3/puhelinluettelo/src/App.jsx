import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddName from './components/AddName'
import ShowAll from './components/Showall'
import phoneBookHandler from './services/phoneBook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([ ])
  const [notification, setNotification] = useState({message:null , type:""})
 

useEffect(()=>{
  phoneBookHandler
    .getAll()
    .then(response =>{setPersons(response.data)})
    .catch(error => console.error("Error getting stuff", error))
    
},[])


  const nameExists = (newName) => {
    const result = persons.some(person=>person.name === newName)
    return result
  }


  const handleUpdate = (id, updatedPerson ) => {
    phoneBookHandler
      .update(id, updatedPerson)
      .then(response=>{

        setPersons(persons.map(p => (p.id !== id ? p :response.data)))
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
          console.error("error updating stuff",error)
          setNotification({message: "Failed to update", type: "error"})
          setTimeout(()=>{setNotification({message: null, type:""}) },5000)
        })
      }
      


  const addName = (event) =>{
    event.preventDefault()
  const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if(window.confirm(`${newName} is already added to the phonebook, replace number?.`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        handleUpdate(existingPerson.id, updatedPerson)
        setNotification(
          {message:`${existingPerson.name} was updated succesfully`, type:"success"})
          setTimeout(() => {setNotification({message: null, type:""}) },5000)
        return
  }
    return
  }

    const nameObject ={
      name: newName,
      number: newNumber,
    }
    
    phoneBookHandler
      .create(nameObject)
      .then(response=>{
        setNotification(
          {message:`${nameObject.name} was added to phonebook`, type:"success"})
          setTimeout(() => {setNotification({message: null, type:""}) },5000)
          setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
  })
    .catch(error => {
          console.error("error",error)
          setNotification( {message:"Failed to add name", type:"error"})
          setTimeout(()=>{ setNotification({message: null, type:""}) },5000)
        })

}
  const handleDelete = (id, name) => {
    console.log(`Deleting ${name}`)
    if(window.confirm(`Delete ${name}?`)){
      phoneBookHandler
        .remove(id)
        .then(() => {
          setNotification(
         {message:`${name} was deleted succesfully`, type: "success"})
          console.log("hello there")
          setTimeout(() => {setNotification({message: null, type:""}) },5000)
          setPersons(persons.filter(person=> person.id !== id))
        })
        .catch(error => {
          console.error("error",error)
          setNotification({message: "Failed to delete", type:"error"})
          setTimeout(()=>{setNotification({message: null, type:""}) },5000)
        })
  }}
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
 
  const handleNewNumber = (event) =>{
    setNewNumber(event.target.value)
  }
const handleFilter = (event) => {
  const value = event.target.value 
 setFilteredNames( value ?  persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase())) : [])
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type}/>
      <Filter handleFilter={handleFilter} filteredNames={filteredNames} handleDelete={handleDelete}/>
      <AddName addName={addName} newName={newName} handleNewName={handleNewName} 
       newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ShowAll persons={persons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App