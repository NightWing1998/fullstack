import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { createNotification } from "./Notification";
import Filter from "./Filter";

const Anecdote = ({ content, id, votes, handleVote }) => (
	<div>
		<div>
			{content}
		</div>
		<div>
			has {votes}
			<button onClick={() => handleVote(id, content)}>vote</button>
		</div>
	</div>
);

const Anecdotes = ({ store }) => {
	const { anecdotes, filter } = store.getState();
	const sortedAnecdotes = [...anecdotes.sort((a, b) => b.votes - a.votes)].filter(({ content }) => content.includes(filter));

	const handleVote = (id, content) => {
		store.dispatch(vote(id));
		createNotification(store, `you voted '${content}'`);
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter store={store} />
			{sortedAnecdotes.map(anecdote => <Anecdote {...anecdote} handleVote={handleVote} key={anecdote.id} />)}
		</div>
	)
};

export default Anecdotes;