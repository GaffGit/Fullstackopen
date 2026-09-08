import { useState } from 'react'

const Header = ({text}) => {
  return (
  <p style={{fontWeight: 'bold', fontSize: '24px'}}>{text}</p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} style={{
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>{text}</button>
  )
}

const StatisticLine = ({total, text}) => { 
  return (
   <tr>
    <td>{text}</td>
    <td>{total}</td>
   </tr>
  )
}

const Statistics = ({statistics}) => {
  const all = statistics[0].total + statistics[1].total + statistics[2].total

  if(all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const average = (statistics[0].total - statistics[2].total)/all
  const positive = (statistics[0].total/all)*100

  return (
      <table>
    <StatisticLine text={statistics[0].text} total={statistics[0].total}/>
    <StatisticLine text={statistics[1].text} total={statistics[1].total}/>
    <StatisticLine text={statistics[2].text} total={statistics[2].total}/>
    <StatisticLine text="all" total={all}/>
    <StatisticLine text="average" total={average}/>
    <StatisticLine text="positive" total= {positive + ' %'}/>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = [
    {
      text: 'good',
      total: good
    },
    {
      text: 'neutral',
      total: neutral
    },
        {
      text: 'bad',
      total: bad
    },
  ]

  const handleGoodClick = () => {
  const updatedGoodClick = good + 1
  setGood(updatedGoodClick)
  }

  const handleNeutralClick = () => {
  const updatedNeutralClick = neutral + 1
  setNeutral(updatedNeutralClick)
  }

  const handleBadClick = () => {
  const updatedBadClick = bad + 1
  setBad(updatedBadClick)
  }

  return (
    <div>
      <Header text= "Give Feedback"/>
      <Button onClick={handleGoodClick} text={statistics[0].text}/>
      <Button onClick={handleNeutralClick} text={statistics[1].text}/>
      <Button onClick={handleBadClick} text={statistics[2].text}/>
      <Header text="statistics"/>
      
      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App