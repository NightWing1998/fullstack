import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification, resetNotification } from "../reducers/notificationReducer";
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

const Anecdotes = props => {

	const handleVote = (id, content) => {
		props.addVote(id);
		props.setNotification(`you voted '${content}'`);
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			{props.anecdotesToShow.map(anecdote => <Anecdote {...anecdote} handleVote={handleVote} key={anecdote.id} />)}
		</div>
	)
};

const mapStateToProps = state => ({
	anecdotesToShow: [...state.anecdotes.sort((a, b) => b.votes - a.votes)].filter(({ content }) => content.includes(state.filter))
});

const mapDispatchToProps = dispatch => {
	return {
		addVote: id => dispatch(vote(id)),
		setNotification: message => {
			dispatch(setNotification(message));
			setTimeout(() => dispatch(resetNotification()), 5000);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes);