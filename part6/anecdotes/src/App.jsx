import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/NewAnecdote';
import Notification from './components/Notification';

const App = () => {
	return (
		<div>
			<Notification />
			<AnecdoteForm />
			<Anecdotes />
		</div>
	);
};

export default App;