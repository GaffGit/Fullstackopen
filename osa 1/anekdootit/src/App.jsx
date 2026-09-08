import { useState } from 'react'

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

const Header = ({text}) => {
  return (
  <p style={{fontWeight: 'bold', fontSize: '24px'}}>{text}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
  }

  const handleRandom = () => {
  const random = getRandomInt(0, (anecdotes.length))
  setSelected(random)
  }

  const handleVote = () => {
  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)
  }

  const indexOfMostVoted = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <p style={{margin: '4px 0'}}>{anecdotes[selected]}</p>
      <p style={{margin: '4px 0'}}>has {votes[selected]} votes</p>
      <Button onClick = {handleRandom} text = "next anecdote"/>
      <Button onClick = {handleVote} text = "vote" />
      <Header text="Anecdote with most votes"/>
      <p style={{margin: '4px 0'}}>{anecdotes[indexOfMostVoted]}</p>
      <p style={{margin: '4px 0'}}>has {votes[indexOfMostVoted]} votes</p>
    </div>
  )
}

export default App