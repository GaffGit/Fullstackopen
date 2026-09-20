import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

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

const Persons = ({personsToShow, onDelete}) => {
  return (

     <div> 
      {personsToShow().map((person) =>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} key={person.name}>
        <Name person={person} key  ={person.name}/>
        <button style={{ fontSize: '12px' }} onClick={() => onDelete(person.id)}>
          delete
          </button>
        </div>
      )}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [addMessage, setAddMessage] = useState(null)
  const [changeMessage, setChangeMessage] = useState(null)

  const hook = () => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])


  const add = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)

    if(person) {
      if(window.confirm(`${newName} is already added to the phonebook, Do you want to replace the old number?`)) {
        const changedPerson = {...person, number: newNumber}
        console.log(changedPerson)
        personService
        .update(person.id, changedPerson)
        .then(response => {setPersons(persons.map(p => p.id !== person.id ? p : response.data))

        setChangeMessage(` ${newName} was changed`)

          setTimeout(() => {
            setChangeMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
          ` 'information of ${person.name}' has already been removed from server`
        )
                setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        })

      }
      setNewName('')
      setNewNumber('')
      return
    }


      const personObject = {
      name: newName, 
      number: newNumber,
      id: persons.length + 1
    }

      setAddMessage(` ${newName} was added to the phonebook`)

       setTimeout(() => {
          setAddMessage(null)
        }, 5000)

      personService.create(personObject).then(response => {
      console.log('received', response.data)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
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

    const handleDelete = (id) => {
      const person = persons.find(p => p.id === id)
      console.log(person)
      if(window.confirm(`Do you want to delete ${person.name} ?`)) {
        personService.remove(person.id).then(() => setPersons(persons.filter(p => p.id !== id)))

      setErrorMessage(`${person.name} was deleted from the phonebook`)

       setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  return (
    <div>
      <Header text="Phonebook"/>
      <Notification message={errorMessage} style={{color: 'red'}}/>
      <Notification message={addMessage} style={{color: 'green'}}/>
      <Notification message={changeMessage} style={{color: 'yellow'}}/>
      <Filter filter={newFilter} onFilterChange={handleFilterChange}/>
      <Header text="add a new"/>
      <PersonForm add={add} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <Header text="Numbers"/>
      <Persons personsToShow={personsToShow} onDelete={handleDelete}/>
    </div>
  )

}

export default App