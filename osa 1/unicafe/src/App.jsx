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

const Statistic = ({total, text}) => 
  { return (
  <p>{text} {total}</p> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodReview = "Good"
  const neutralReview = "Neutral"
  const badReview = "Bad"

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
      <Button onClick={handleGoodClick} text={goodReview}/>
      <Button onClick={handleNeutralClick} text={neutralReview}/>
      <Button onClick={handleBadClick} text={badReview}/>
      <Header text="statistics"/>
      <Statistic text={goodReview} total={good}/>
      <Statistic text={neutralReview} total={neutral}/>
      <Statistic text={badReview} total={bad}/>
      <Statistic text="all" total={all}/>
      <Statistic text="average" total={(good - bad)/all}/>
      <Statistic text="positive" total={good/all + " %"}/>
    </div>
  )
}

export default App