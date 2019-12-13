import React, { useEffect } from 'react';
import Anecdotes from './components/Anecdotes';
import AnecdoteForm from './components/NewAnecdote';
import Notification from './components/Notification';
import { connect } from "react-redux";
import { initalizeAnecdotes } from "./reducers/anecdoteReducer";

const App = props => {

	const { initalizeAnecdotesInStore } = props;

	useEffect(() => {
		(async () => {
			initalizeAnecdotesInStore();
		})();
	});

	return (
		<div>
			<Notification />
			<AnecdoteForm />
			<Anecdotes />
		</div>
	);
};

const mapDispatchToProps = {
	initalizeAnecdotesInStore: initalizeAnecdotes
}

export default connect(null, mapDispatchToProps)(App);