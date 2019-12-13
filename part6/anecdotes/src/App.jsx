import React from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/NewAnecdote';
import Notification from './components/Notification';

const App = props => {
	const { store } = props;

	return (
		<div>
			<Notification store={store} />
			<AnecdoteForm store={store} />
			<Anecdotes store={store} />
		</div>
	);
};

export default App;