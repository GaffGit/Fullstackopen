import { useEffect, useState } from 'react'
import axios from 'axios'


const CountryDetails = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      const api_key = import.meta.env.VITE_WEATHER_KEY
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
    })
    }, [country.capital])

    return (
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
      {weather && (
        <div>
      <h2>Weather in {country.capital}</h2> 
      <p>temperature {weather.main.temp} °C</p>
      <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
      {console.log(weather.weather[0].icon)}
      <p>wind {weather.wind.speed} m/s</p>
      </div>
      )}
       </div>)
}

function App() {
  const [country, setNewCountry] = useState(null)
  const [input, setNewInput] = useState('')
  const [selected, setSelected] = useState(null)


  

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
    setSelected(null)
  }

  const onShow = (country) => {

}

  const matches = countriesToShow()

  return (
    <div>
    <p>find countries</p>
    <input value={input} onChange={handleChange}/>
    <div>
    {matches.length > 10 && <p>Too many matches, specify another filter</p>}
    {matches.length <= 10 && matches.length != 1 && !selected && matches.map(country => 
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} key={country.name.common}>
    <p>{country.name.common}</p>
    <button style={{ fontSize: '12px' }} onClick={() => setSelected(country)}>Show</button>
    </div>)}

    {matches.length == 1 && <CountryDetails country={matches[0]}/>}
    </div>
    {selected && <CountryDetails country={selected}/>}
    </div>
  )
}

export default App
