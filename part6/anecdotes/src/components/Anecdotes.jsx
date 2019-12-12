import React from "react";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ content, id, votes, handleVote }) => (
	<div>
		<div>
			{content}
		</div>
		<div>
			has {votes}
			<button onClick={() => handleVote(id)}>vote</button>
		</div>
	</div>
);

const Anecdotes = ({ store }) => {
	const anecdotes = store.getState();
	const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

	const handleVote = id => store.dispatch(vote(id));

	return (
		<div>
			<h2>Anecdotes</h2>
			{sortedAnecdotes.map(anecdote => <Anecdote {...anecdote} handleVote={handleVote} key={anecdote.id} />)}
		</div>
	)
};

export default Anecdotes;