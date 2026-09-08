import { useState } from 'react'

const Header = ({text}) => {
  return (
  <p style={{fontWeight: 'bold', fontSize: '24px'}}>{text}</p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({total, text}) => { 
  return (
  <p>{text} {total}</p> 
  )
}

const Statistics = ({statistics}) => {
  const average = (statistics[0].total - statistics[2].total)/statistics[3].total
  const positive = statistics[0].total/statistics[3].total

  return (
      <div>
    <Statistic text={statistics[0].text} total={statistics[0].total}/>
    <Statistic text={statistics[1].text} total={statistics[1].total}/>
    <Statistic text={statistics[2].text} total={statistics[2].total}/>
    <Statistic text={statistics[3].text} total={statistics[3].total}/>
    <Statistic text="average" total={average}/>
    <Statistic text="positive" total= {positive + ' %'}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

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
    {
      text: 'all',
      total: all
    },
  ]

  const handleGoodClick = () => {
  const updatedGoodClick = good + 1
  const updatedAllClick = all + 1
  setGood(updatedGoodClick)
  setAll(updatedAllClick)
  }

  const handleNeutralClick = () => {
  const updatedNeutralClick = neutral + 1
  const updatedAllClick = all + 1
  setNeutral(updatedNeutralClick)
  setAll(updatedAllClick)
  }

  const handleBadClick = () => {
  const updatedBadClick = bad + 1
  const updatedAllClick = all + 1
  setBad(updatedBadClick)
  setAll(updatedAllClick)
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