import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/NewAnecdote';

const App = props => {
	const { store } = props;

	return (
		<div>
			<Anecdotes store={store} />
			<AnecdoteForm store={store} />
		</div>
	);
};

export default App;