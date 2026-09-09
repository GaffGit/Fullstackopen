import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Name = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Filter = ({filter, onFilterChange}) => {

  return (
        <div>
        <p style={{ display: 'inline-block' }}>filter shown with</p>
        <input value={filter} onChange={onFilterChange}/>  
        </div>
  )
}

const PersonForm = ({add, name, number, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={add}>
        <div>name: <input value={name} onChange={handleNameChange}/></div>
        <div>number: <input value={number} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  )
}

const Persons = ({personsToShow}) => {
  return (

     <div> 
      {personsToShow().map((person) =>
        <Name person={person} key  ={person.name}/>
      )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const add = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange  = (event) => {
    setNewName(event.target.value)
  }

    const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = () => 
    persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Header text="Phonebook"/>
      <Filter filter={newFilter} onFilterChange={handleFilterChange}/>
      <Header text="add a new"/>
      <PersonForm add={add} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <Header text="Numbers"/>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App