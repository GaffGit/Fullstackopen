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

const Clicks = ({total, text}) => 
  { return (
  <p>{total} {text}</p> 
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = "Good"
  const neutralReview = "Neutral"
  const badReview = "Bad"

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
      <Button onClick={handleGoodClick} text={goodReview}/>
      <Button onClick={handleNeutralClick} text={neutralReview}/>
      <Button onClick={handleBadClick} text={badReview}/>
      <Header text="statistics"/>
      <Clicks text={goodReview} total={good}/>
      <Clicks text={neutralReview} total={neutral}/>
      <Clicks text={badReview} total={bad}/>
    </div>
  )
}

export default App