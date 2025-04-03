const ShowAll = ({ persons, handleDelete }) => {
    if (!Array.isArray(persons)) {
    // If the persons prop is not an array, log an error and return null
    console.error('persons prop is not an array:', persons);
    return null;
  }
    return(

<ul>
      {persons.map(person=>( 
      <li key={person.id}>{person.name} {person.number}
      <button onClick={() =>handleDelete(person.id, person.name)}>Delete</button></li>
      ))}
      </ul>

    )
}

export default ShowAll;