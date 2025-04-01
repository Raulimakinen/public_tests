const Filter = ({handleFilter, filteredNames, handleDelete}) => {
        
        
return (
      <div>Search:
        <input type="text" onChange={handleFilter}/> 
      {filteredNames.map(person =>
         <div key={person.name}>
           <p>{person.name} {person.number} <button onClick={() =>handleDelete(person.id)}>Delete</button></p>
           </div>)}
       </div>)
 
}
export default Filter;