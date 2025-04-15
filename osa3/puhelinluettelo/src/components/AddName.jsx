const AddName = ({ addName, newName , handleNewName, newNumber, handleNewNumber }) =>{


    return(
          <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input type="text" value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default AddName;