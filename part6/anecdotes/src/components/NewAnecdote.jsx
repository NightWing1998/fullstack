import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
	const handleCreate = async event => {
		event.preventDefault();
		const content = event.target.content.value;
		event.target.content.value = "";
		props.createAnecdote(content);
		props.setNotification(`You created '${content}'`, 5);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreate}>
				<div><input type="text" name="content" id="content" /></div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	createAnecdote,
	setNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);