import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [country, setNewCountry] = useState(null)
  const [input, setNewInput] = useState('')
  

  useEffect(() => {
    console.log('fetching countries...')
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setNewCountry(response.data)
        })
  }, [])

  if(!country) {
    return null
  }

   const countriesToShow = () => {
    if(input === '') {
      return []
    }
    return country.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
  }
  
  
  const handleChange  = (event) => {
    setNewInput(event.target.value)
  }

  const matches = countriesToShow()

  return (
    <div>
    <p>find countries</p>
    <input value={input} onChange={handleChange}/>
    <div>
    {matches.length > 10 && <p>Too many matches, specify another filter</p>}
    {matches.length <= 10 && matches.length != 1 && matches.map(country => <p key={country.name.common}>{country.name.common}</p>)}
    {matches.length == 1 && matches.map
    (country => 
    <div key={country.name.common}>
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital}</p>
     <p>Area {country.area}</p>
     <h1>Languages</h1>
     <ul>
      {Object.values(country.languages).map(language => (
        <li key={language}>{language}</li>
      ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
    )}
    </div>
    </div>
  )
  }

export default App
