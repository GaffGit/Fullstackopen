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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
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

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = () => 
    persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Header text="Phonebook"/>
      <div>
        <p style={{ display: 'inline-block' }}>filter shown with</p>
        <input value={newFilter} onChange={handleFilterChange}/>  
        </div>
      <Header text="add a new"/>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <Header text="Numbers"/>
      {personsToShow().map((person) =>
        <Name person={person} key ={person.name}/>
      )}
    </div>
  )

}

export default App