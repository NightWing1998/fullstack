import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {

	const [ currentAnecdote , setAnecdote ] = useState(0);
	const { anecdotes } = props;
	const [ votes , setVotes ] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0));

	// console.log(currentAnecdote , votes);

	let handleVote = () => {
		let newVotes = [...votes];
		newVotes[currentAnecdote] += 1;
		setVotes(newVotes);
	}

	const handleNext = () => setAnecdote(parseInt(Math.random()*anecdotes.length))

	let displayMax = () => (
			<p>
				{anecdotes[votes.indexOf(Math.max(...votes))]}
			</p>
		)

	return (
		<>
			<div>
				<strong>
					Anecdote of the day
				</strong>
				<p>
					{anecdotes[currentAnecdote]}
				</p>
			</div>
			<div>
				<strong>
					Anecdote with most votes
				</strong>
				{displayMax()}
			</div>
			<button onClick={handleVote} >vote</button>
			<button onClick={handleNext} >next anecdote</button>
		</>
	)
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));